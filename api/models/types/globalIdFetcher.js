import {
  fromGlobalId
} from 'graphql-relay'

import { ObjectId } from 'mongodb'
import mongoUtil from '../mongoUtil'

import { UserType, FoodType } from '../types'

let Users = ""
let Foods = ""

mongoUtil.connectToServer( function( err ) {
	Users = mongoUtil.getUsers()
	Foods = mongoUtil.getFoods()
})

const globalIdFetcher = (globalId) => {
  const { type, id } = fromGlobalId(globalId)
  switch (type) {
    case 'UsersLibrary':
      return usersLibrary
    case 'User':
	console.log(Users.findOne(ObjectId(id)))
      return Users.findOne(ObjectId(id))
	case 'FoodsLibrary':
		return foodsLibrary
	case 'Food':
		console.log(Foods.findOne(ObjectId(id)))
		
	  return Foods.findOne(ObjectId(id))
		
    default:
      return null
  }
}


export default globalIdFetcher
