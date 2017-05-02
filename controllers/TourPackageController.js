'use strict'

const TourPackage = require('../models/TourPackage');

module.exports = {

	get: function(params, completion){
	  var key = Object.keys(params)[0];
    var myString = params[key]
    if(key === "place"){
			TourPackage.scan({	place: {contains: [myString]} }).exec(function(err, results){
				if(err) return completion(err, null);
				completion(null, results);
			});
    }else{
			TourPackage.query(key).eq(myString).attributes(['id', 'title', 'date', 'image_url', 'type', 'info' , 'priority', 'is_special', 'is_avaliable']).ascending('createdAt').exec(function(err, results){
				if (err){
					completion(err, null)
					return;
				}
				completion(null, results)
				return
			});
		}
	},

	getByDate: function(completion){
		TourPackage.scan().exec(function (err, results){
			if (err){
				completion(err, null)
				return;
			}
			var filterResults = [];
			var today = new Date();
			var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			var plusD = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+7);
			for(var i = 0 ; i<(results.length) ; i++){
				for (var ii in results[i].date){
					var sd = new Date(results[i].date[ii].start_date);
					var start = sd.getFullYear()+'-'+(sd.getMonth()+1)+'-'+sd.getDate();
					if (date<=start && start<=plusD){
						filterResults.push(results[i]);
					}
				}
			}
			completion(null, filterResults);
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
	},

	put: function(id, params, completion){
		console.log(params.body);
		TourPackage.update({id: id},{$PUT: params.body}, function(err, result){
			if (err) {
				return completion(err, null);
			}
			completion(null, result);
		});
	},

	delete: function(id, completion){
		TourPackage.delete({id: id}, function(err) {
			console.log(err);
			if (err) {
				completion(err, null)
				return;
			}
			completion(null, "Delete Success!");
		});
	}
}
