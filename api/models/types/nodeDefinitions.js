import { nodeDefinitions } from 'graphql-relay'

import { UserType, FoodType, TokenType, globalIdFetcher, globalTypeResolver } from '../types'

export const { nodeInterface, nodeField } = nodeDefinitions(
  globalIdFetcher,
  globalTypeResolver
) 
