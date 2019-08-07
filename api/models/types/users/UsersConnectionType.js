import {
  connectionDefinitions
} from 'graphql-relay'

import UserType from './UserType.js'

const { connectionType: UsersConnectionType } =
  connectionDefinitions({
    name: 'User',
    nodeType: UserType
  })
  
export default UsersConnectionType