import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList
} from 'graphql';

import {
  connectionArgs,
  globalIdField,
  connectionFromPromisedArray
} from 'graphql-relay'

import { nodeInterface, nodeField } from '../nodeDefinitions.js'

import FoodsConnectionType from './FoodsConnectionType.js'

import { ObjectId } from 'mongodb'
import mongoUtil from '../../mongoUtil'

let Users = ""
let Foods = ""

mongoUtil.connectToServer( function( err ) {
	Users = mongoUtil.getUsers()
	Foods = mongoUtil.getFoods()
})

let connectionArgsWithSearch = connectionArgs
connectionArgsWithSearch.expiry = { type: GraphQLString }
connectionArgsWithSearch.create = { type: GraphQLString }
connectionArgsWithSearch.name = { type: GraphQLString }

const FoodsLibraryType = new GraphQLObjectType({
  name: 'FoodsLibrary',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('FoodsLibrary'),
    foodsConnection: {
		type: FoodsConnectionType,
		description: 'A list of the foods in the database',
		args: connectionArgsWithSearch,
		async resolve(root, args, context) {
			
			if (context.session === undefined) return {
				result: "false"
			}
			
			const name = args.name
			const expiry = args.expiry
			const create = args.create
			
			var selectedSort = {}
			
			if (name != undefined) {
				selectedSort = {name: parseInt(name)}
			} else {
				if (expiry != undefined) {
					selectedSort = {expiry: parseInt(expiry)}
				} else {
					if (create != undefined) {
						selectedSort = {create: parseInt(create)}
					} else {
						selectedSort = {create: 1}
					}
				}
			}
			
			const res = await Foods.aggregate( [ {$match: {user: context.session._id} }, { $sort : selectedSort }, { $addFields: { days: { $floor: { $divide: [{ $divide: [{ $divide: [{ $divide: [{$subtract: [ {$toDouble: "$expiry"}, new Date().getTime() ] }, 1000]}, 60]}, 60]}, 24]}} } } ] )
			
			return  connectionFromPromisedArray(
			  res.toArray(),
			  args
			)
		}
    }
  }
})

export default FoodsLibraryType