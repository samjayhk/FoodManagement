import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLEnumType
} from 'graphql'

import {
  mutationWithClientMutationId,
  globalIdField,
  fromGlobalId,
  nodeDefinitions,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
  connectionFromPromisedArray
} from 'graphql-relay'

import { 
	UserType, 
	UsersLibraryType, 
	UsersConnectionType, 
	FoodType, 
	FoodsLibraryType, 
	FoodsConnectionType, 
	SearchLibraryType, 
	TokenType,
	ExpiryLibraryType,	
	SelectLibraryType,
	globalIdFetcher, 
	globalTypeResolver, 
	nodeInterface, 
	nodeField
} from '../types'

import { prepare } from "../prepare.js"

const usersLibrary = { type: UsersLibraryType }
const foodsLibrary = { type: FoodsLibraryType }
const searchLibrary = { type: SearchLibraryType }
const expiryLibrary = { type: ExpiryLibraryType }
const selectFoodLibrary = { type: SelectLibraryType }

const Query = new GraphQLObjectType({
	name: 'Query',
	fields: {
		node: nodeField,
		userLibrary: {
			type: UsersLibraryType,
			description: 'The User Library',
			resolve: () => usersLibrary
		},
		foodLibrary: {
			type: FoodsLibraryType,
			description: 'The Food Library',
			resolve: () => foodsLibrary
		},
		search: {
			type: SearchLibraryType,
			description: 'Search Service',
			resolve: () => searchLibrary
		},
		expiry: {
			type: ExpiryLibraryType,
			description: 'Expiry Service for last 6 item',
			resolve: () => expiryLibrary
		},
		selectFood: {
			type: SelectLibraryType,
			description: 'Expiry Service for last 6 item',
			resolve: () => selectFoodLibrary
		}
	}
})

export default Query