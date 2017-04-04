'use strict'

const TourPackage = require('../models/TourPackage');
const h = require('../helpers');

module.exports = {

	get: function(params, completion){
  //   var type = params.type;
	// 	var params = {
  //     TableName : "TourPackages",
  //     ProjectionExpression: "id, title, priority, is_special, is_avaliable",
  //     KeyConditionExpression: "#type = :type",
  //     ExpressionAttributeNames:{
  //         "#type": "type"
  //     },
  //     ExpressionAttributeValues: {
  //         ":type": type
  //     }
  // };
  // h.findPackages(params)
  //   .then(data => console.log(data))
  //   .catch(err => console.log("Error in Searching " + err));
	  var key = Object.keys(params)[0];
    var myString = params[key]
    if(myString === "true"){
      myString = Boolean(myString)
    }
		TourPackage.query(key).eq(myString).attributes(['id', 'title', 'date', 'image_url', 'type', 'info' , 'priority', 'is_special', 'is_avaliable']).exec(function(err, results){
			if (err){
				completion(err, null)
				return;
			}
			completion(null, results)
			return
		})
	},

	getByDate: function(date, completion){
		console.log(date);
		TourPackage.query(date.start_date).eq(date).exec(function (err, dogs){
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
	},

	put: function(id, params, completion){
		TourPackage.update({id: id}, params, function(err, result){
			console.log(result);
			if (err) {
				return completion(err, null);
			}
			completion(null, result);
		});
	},

	delete: function(id, completion){
		TourPackage.delete({id: id}, function(err) {
			if (err) {
				completion(err, null)
				return;
			}
			completion(null, "Delete Success!");
		});
	}
}
