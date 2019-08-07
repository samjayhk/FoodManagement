import {
    MongoClient,
    ObjectId
} from 'mongodb'

var _db;

module.exports = {

  connectToServer: async function( callback ) {
    MongoClient.connect( 'mongodb://mongo/food', function( err, db ) {
      _db = db;
	  
      return callback( err );
    } );
  },

  getFoods: function() {
	 
    return _db.collection('food');
  },
  
  getUsers: function() {
    return _db.collection('users')
  }
  
};