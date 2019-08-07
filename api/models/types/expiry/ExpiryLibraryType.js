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

import { ObjectId } from 'mongodb'
import mongoUtil from '../../mongoUtil'

import prepare from '../../prepare.js'

import { nodeInterface, nodeField } from '../nodeDefinitions.js'
import FoodsConnectionType from '../foods/FoodsConnectionType.js'

let Users = ""
let Foods = ""

mongoUtil.connectToServer( function( err ) {
	Users = mongoUtil.getUsers()
	Foods = mongoUtil.getFoods()
})

let connectionArgsWithSearch = connectionArgs
connectionArgsWithSearch.keywords = { type: new GraphQLList(GraphQLString) }

const ExpiryLibraryType = new GraphQLObjectType({
  name: 'ExpiryLibrary',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('ExpiryLibrary'),
    foodsConnection: {
		type: FoodsConnectionType,
		description: 'A list of the foods in the database',
		args: connectionArgsWithSearch,
		async resolve(root, args, context) {
			
			if (context.session === undefined) return {
				result: "false"
			}

			try {
				const diff = []
				const res = (await Foods.aggregate( [ {$match: {expiry: {$gte: new Date().getTime().toString()}, user: context.session._id} }, { $sort : { expiry : 1 } }, { $limit: 6 }, { $addFields: { days: { $floor: { $divide: [{ $divide: [{ $divide: [{ $divide: [{$subtract: [ {$toDouble: "$expiry"}, new Date().getTime() ] }, 1000]}, 60]}, 60]}, 24]}} } } ] ))
				
				return  connectionFromPromisedArray(
				  res.toArray(),
				  args
				) 
			} catch (e) {
				console.log(e)
				return {
					result: "false"
				}
			}
		}
    }
  }
})

export default ExpiryLibraryType