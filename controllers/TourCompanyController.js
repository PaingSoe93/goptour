'use strict'

//const h = require('../helpers');
const TourCompany = require('../models/TourCompany');

module.exports = {

	get: function(params, completion){
		TourCompany.scan().exec(function(err, results){
      //console.log(results.lastKey);
			if (err){
				completion(err, null)
				return;
			}

			completion(null, results)
			return
		})
	},

	getById: function(id, completion){
		TourCompany.get({id: id}, function(err, result){
			if (err){
				completion(err, null)
				return;
			}

			completion(null, result)
		});
	},

	post: function(params, completion){
		TourCompany.create(params.body, function(err, result){
			if (err){
				completion(err, null)
				return;
			}

			completion(null, result)
		});
	}

}
