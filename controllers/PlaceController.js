'use strict';

const Place = require('../models/Place');

module.exports = {
  get: function(params, completion){
    Place.scan().exec(function(err, results) {
      if(err) return completion(err, null);
      if(results.lastKey){
        Place.scan().startAt(results.lastKey).exec(function(err, places){
          if(err) return completion(err, null);
          results.push(places);
          completion(null, results);
        });
      }else {
        completion(null, results);
      }
    })
  },

  post: function(params, completion){
    Place.create(params.body, function(err, result){
			if (err){
				completion(err, null)
				return;
			}

			completion(null, result)
		});
  },

  put: function(id, params, completion){
		Place.update({id: id},{$PUT: params.body}, function(err, result){
			if (err) {
				return completion(err, null);
			}
			completion(null, result);
		});
	},

  delete: function(id, completion){
		Place.delete({id: id}, function(err) {
			if (err) {
				completion(err, null)
				return;
			}
			completion(null, "Delete Success!");
		});
  }
}
