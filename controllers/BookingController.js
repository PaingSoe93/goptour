'use strict';

const Booking = require('../models/Booking');

module.exports = {
  get: function(params, completion){
    var key = Object.keys(params)[0];
    var myString = params[key]
    Booking.query(key).eq(myString).exec(function(err, results){
      if(err) return completion(err, null);
      return completion(null, results);
    });
  },

  getById: function(id, completion){
    Booking.get({id : id}, function(err, result){
      if(err) return completion(err, null);
      completion(null, result);
    });
  },


  post : function(params, completion){
    Booking.create(params.body, function(err, result){
			if (err){
				completion(err, null)
				return;
			}

			completion(null, result)
		});
  },

  put: function(id, params, completion){
		Booking.update({id: id},{$PUT: params.body}, function(err, result){
			if (err) {
				return completion(err, null);
			}
			completion(null, result);
		});
	},

  delete: function(id, completion){
		Booking.delete({id: id}, function(err) {
			if (err) {
				completion(err, null)
				return;
			}
			completion(null, "Delete Success!");
		});
  }
}
