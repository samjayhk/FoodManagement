import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList
} from 'graphql';

import { 
	loginMutation, 
	registerMutation, 
	createFoodMutation, 
	modifyFoodMutation, 
	removeFoodMutation
} from '../mutation'

import { prepare } from "../prepare.js"

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		login: loginMutation,
		registration: registerMutation,
		createFood: createFoodMutation,
		modifyFood: modifyFoodMutation,
		removeFood: removeFoodMutation
	}
})

export default Mutation