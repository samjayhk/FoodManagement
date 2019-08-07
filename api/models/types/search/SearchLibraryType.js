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

const SearchLibraryType = new GraphQLObjectType({
  name: 'SearchLibrary',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('SearchLibrary'),
    foodsConnection: {
		type: FoodsConnectionType,
		description: 'A list of the foods in the database',
		args: connectionArgsWithSearch,
		async resolve(root, args, context) {
			if (context.session === undefined) return {
				result: "false"
			}

			try {
				const finalResult = []
				for (var i = 0; i < args.keywords.length; i++) {
					finalResult.push({
						keywords: {
							$regex: args.keywords[i]
						}
					})
				}

				const res = await Foods.aggregate( [ {$match: { $and: [{ $or: finalResult }, { user: context.session._id }] } }, { $addFields: { days: { $floor: { $divide: [{ $divide: [{ $divide: [{ $divide: [{$subtract: [ {$toDouble: "$expiry"}, new Date().getTime() ] }, 1000]}, 60]}, 60]}, 24]}} } } ] )
				
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

export default SearchLibraryType