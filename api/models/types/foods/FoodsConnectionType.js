import {
  connectionDefinitions
} from 'graphql-relay'

import FoodType from './FoodType.js'

const { connectionType: FoodsConnectionType } =
	connectionDefinitions({
	  name: 'Food',
	  nodeType: FoodType
	})
	
export default FoodsConnectionType