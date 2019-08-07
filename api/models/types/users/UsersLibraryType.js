import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList
} from 'graphql';

import {
  globalIdField,
  connectionFromPromisedArray
} from 'graphql-relay'

import { nodeInterface, nodeField } from '../nodeDefinitions.js'

import UsersConnectionType from './UsersConnectionType.js'

import { ObjectId } from 'mongodb'
import mongoUtil from '../../mongoUtil'

let Users = ""
let Foods = ""

mongoUtil.connectToServer( function( err ) {
	Users = mongoUtil.getUsers()
	Foods = mongoUtil.getFoods()
})

const UsersLibraryType = new GraphQLObjectType({
  name: 'UsersLibrary',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('UsersLibrary'),
    usersConnection: {
      type: UsersConnectionType,
      description: 'A list of the users in the database',
      async resolve(_, args, context) {
		if (context.session === undefined) return {
			result: "false"
		}
		const res = await Users.find({ _id: ObjectId(context.session._id) })
		return connectionFromPromisedArray(
		  res.toArray(),
		  args
        ) 
      }
    }
  }
})

export default UsersLibraryType