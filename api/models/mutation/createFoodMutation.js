import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList
} from 'graphql'

import {
  mutationWithClientMutationId
} from 'graphql-relay'

import { 
	FoodType
} from '../types'

import { ObjectId } from 'mongodb'
import mongoUtil from '../mongoUtil'

let Users = ""
let Foods = ""

mongoUtil.connectToServer( function( err ) {
	Users = mongoUtil.getUsers()
	Foods = mongoUtil.getFoods()
})

const createFoodMutation = mutationWithClientMutationId({
  name: 'createFoodMutation',
  inputFields: {
		name: { type: GraphQLString },
		type: { type: GraphQLString },
		expiry: { type: GraphQLString },
		keywords: { type: GraphQLString },
		cover: { type: GraphQLString }
  },
  outputFields: {
    result: {
      type: FoodType,
      resolve: obj => obj
    }
  },
  async mutateAndGetPayload (params, context) {
		if (context.session === undefined) return {
			result: "false"
		}

		params.user = context.session._id
		params.create = Date.now()
		
		try {
			const res = await Foods.insertOne(params)
			
			if (res.result.n == 0) {
				params.result = "false"
			} else {
				params.result = "true"
			}
			
			return Promise.resolve(
				params
			)
		} catch (e) {
			console.log(e)
			return {
				result: "false"
			}
		}
	}
})

export default createFoodMutation