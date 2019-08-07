import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList
} from 'graphql'

import {
  fromGlobalId,
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

const modifyFoodMutation = mutationWithClientMutationId({
  name: 'modifyFoodMutation',
  inputFields: {
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		type: { type: GraphQLString },
		expiry: { type: GraphQLString },
		keywords: { type: GraphQLString }
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
		
		const { type, id } = fromGlobalId(params.id)

		const check = await (Foods.findOne({
			user: context.session._id,
			_id: ObjectId(id)
		}))

		if (check == null || !(check.user === context.session._id)) return {
			result: "false"
		}

		const foodId = id
		const newFood = params
		delete newFood.id
		try {
			const res = await Foods.updateOne({
				_id: ObjectId(foodId)
			}, {
				$set: newFood
			})
			if (res.result.n == 0) {
				params.result = "false"
			} else {
				params.result = "true"
			}
			
			return Promise.resolve(
				params
			)
		} catch (e) {
			return {
				result: "false"
			}
		}
	}
})

export default modifyFoodMutation