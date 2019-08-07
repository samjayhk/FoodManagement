import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList
} from 'graphql';

import {
  mutationWithClientMutationId
} from 'graphql-relay'

import { 
	UserType
} from '../types'

import { ObjectId } from 'mongodb'
import mongoUtil from '../mongoUtil'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

let SALT_ROUNDS = 2

let hash = text => bcrypt.hash(text, SALT_ROUNDS)

let Users = ""
let Foods = ""

mongoUtil.connectToServer( function( err ) {
	Users = mongoUtil.getUsers()
	Foods = mongoUtil.getFoods()
})

const registerMutation = mutationWithClientMutationId({
  name: 'registerMutation',
  inputFields: {
    mobile: { type: GraphQLString },
	password: { type: GraphQLString }
  },
  outputFields: {
    result: {
      type: UserType,
      resolve: obj => obj
    }
  },
  async mutateAndGetPayload (params, context) {
		try {
			const check = await (Users.findOne({
				mobile: params.mobile
			}))
			if (check != null && (check.mobile === params.mobile)) return {
				result: "false"
			}

			const hashedPassword = await hash(params.password, SALT_ROUNDS)

			const res = await Users.insertOne({
				mobile: params.mobile,
				pass: hashedPassword,
				reg: Date.now(),
				last: Date.now()
			})

			if (res.result.n == 0) {
				return Promise.resolve(
					{
						result: "false",
					}
				)
			} else {
				return Promise.resolve(
					{
						result: "true",
					}
				)
			}

			return Promise.resolve(
				{
					result: "false",
				}
			)
		} catch (e) {
			return {
				result: "false"
			}
		}
	}
})

export default registerMutation