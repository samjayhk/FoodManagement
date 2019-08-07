import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList
} from 'graphql';

import {
  mutationWithClientMutationId
} from 'graphql-relay'

import {
	TokenType
} from '../types'

import { ObjectId } from 'mongodb'
import mongoUtil from '../mongoUtil'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

let SALT_ROUNDS = 2
let SECRET = 'eutvh435874vj577yvy37b87'

let hash = text => bcrypt.hash(text, SALT_ROUNDS)

let createToken = ({
	_id
}) => jwt.sign({
	_id
}, SECRET, {
	expiresIn: '7d'
})

let Users = ""
let Foods = ""

mongoUtil.connectToServer( function( err ) {
	Users = mongoUtil.getUsers()
	Foods = mongoUtil.getFoods()
})

const loginMutation = mutationWithClientMutationId({
  name: 'loginMutation',
  inputFields: {
    mobile: { type: GraphQLString },
	password: { type: GraphQLString }
  },
  outputFields: {
    result: {
      type: TokenType,
      resolve: obj => obj
    }
  },
  async mutateAndGetPayload (params, context) {
		try {
			const check = await (Users.findOne({
				mobile: params.mobile
			}))
			
			
			if (check != null && !(check.mobile === params.mobile)) return {
				result: "false",
				token: "false"
			}

			const passwordIsValid = await bcrypt.compare(params.password, check.pass)
			if (!passwordIsValid) return {
				result: "false",
				token: "false"
			}

			await Users.updateOne({
				_id: ObjectId(check._id)
			}, {
				$set: {
					last: Date.now()
				}
			})
			
			return Promise.resolve(
				{
					result: "true",
					token: await createToken(check)
				}
			)
		} catch (e) {
			return {
				result: "false",
				token: null
			}
		}
	}
})

export default loginMutation