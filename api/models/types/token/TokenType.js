import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList
} from 'graphql';

import {
  globalIdField
} from 'graphql-relay'

import { nodeInterface, nodeField } from '../nodeDefinitions.js'
const TokenType = new GraphQLObjectType({
	name: 'Token',
	interfaces: [nodeInterface],
	fields: {
    id: globalIdField('Food', obj => obj._id),
	 result: { type: GraphQLString },
     token: { type: GraphQLString }
   }
 });
 
 export default TokenType