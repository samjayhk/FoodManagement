import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList
} from 'graphql';

import {
  globalIdField
} from 'graphql-relay'

import { nodeInterface, nodeField } from '../nodeDefinitions.js'

const UserType = new GraphQLObjectType({
  name: 'UserType',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('User', obj => obj._id),
	result: { type: GraphQLString },
	mobile: { type: GraphQLString },
	reg: { type: GraphQLString },
	last: { type: GraphQLString }
  }
})
 
 export default UserType