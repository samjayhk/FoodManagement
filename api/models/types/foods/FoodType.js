import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList
} from 'graphql';

import {
  globalIdField
} from 'graphql-relay'

import { nodeInterface, nodeField } from '../nodeDefinitions.js'

const FoodType = new GraphQLObjectType({
  name: 'FoodType',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('Food', obj => obj._id),
	result: { type: GraphQLString },
	name: { type: GraphQLString },
	create: { type: GraphQLString },
	type: { type: GraphQLString },
	expiry: { type: GraphQLString },
	keywords: { type: GraphQLString },
	cover: { type: GraphQLString },
	days: { type: GraphQLString }
  }
})

export default FoodType