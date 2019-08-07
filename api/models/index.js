import {
	GraphQLSchema,
} from 'graphql';

import { Query, Mutation } from './schemas'

module.exports = new GraphQLSchema({
    query: Query,
	mutation: Mutation
});