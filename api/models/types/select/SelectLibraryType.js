import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList
} from 'graphql';

import {
  fromGlobalId,
  connectionArgs,
  globalIdField,
  connectionFromPromisedArray
} from 'graphql-relay'

import { ObjectId } from 'mongodb'
import mongoUtil from '../../mongoUtil'

import { nodeInterface, nodeField } from '../nodeDefinitions.js'
import FoodsConnectionType from '../foods/FoodsConnectionType.js'

let Users = ""
let Foods = ""

mongoUtil.connectToServer( function( err ) {
	Users = mongoUtil.getUsers()
	Foods = mongoUtil.getFoods()
})

let connectionArgsWithSearch = connectionArgs
connectionArgsWithSearch.id = { type: GraphQLString }

const SelectLibraryType = new GraphQLObjectType({
  name: 'SelectLibrary',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('SelectLibrary'),
    foodsConnection: {
		type: FoodsConnectionType,
		description: 'A list of the foods in the database',
		args: connectionArgsWithSearch,
		async resolve(root, args, context) {
			if (context.session === undefined) return {
				result: "false"
			}

			try {
				const { type, id } = fromGlobalId(args.id)

				const res = await Foods.aggregate( [ {$match: { _id: ObjectId(id), user: context.session._id}}, { $addFields: { days: { $floor: { $divide: [{ $divide: [{ $divide: [{ $divide: [{$subtract: [ {$toDouble: "$expiry"}, new Date().getTime() ] }, 1000]}, 60]}, 60]}, 24]}} } } ] )
				
				return  connectionFromPromisedArray(
				  res.toArray(),
				  args
				) 
			} catch (e) {
				return {
					result: "false"
				}
			}
		}
    }
  }
})

export default SelectLibraryType