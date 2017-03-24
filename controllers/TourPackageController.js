'use strict'

const TourPackage = require('../models/TourPackage');

module.exports = {

	get: function(params, completion){
    var key = Object.keys(params)[0];
    var myString = params[key]
    if(myString === "true"){
      myString = Boolean(myString)
    }
		TourPackage.query(key).eq(myString).attributes(['id', 'title', 'image_url', 'type', 'info' , 'priority', 'is_special', 'is_avaliable']).exec(function(err, results){
			if (err){
				completion(err, null)
				return;
			}
			console.log(results[0].info.quick_info);
			completion(null, results)
			return
		})
	},

	getById: function(id, completion){
		TourPackage.get({id: id}, function(err, result){
			if (err){
				completion(err, null)
				return;
			}

			completion(null, result)
		});
	},

	post: function(params, completion){
		TourPackage.create(params.body, function(err, result){
			if (err){
				completion(err, null)
				return;
			}

			completion(null, result)
		});
	}

}
