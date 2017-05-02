'use strict';

const TourPackage = require('../models/TourPackage');

const _ = require('underscore-node');

module.exports = {
  get: function(params, completion){
    var places = [];
    TourPackage.scan().attributes(['place']).exec(function(err, results) {
      if(err) return completion(err, null);
      if(results.lastKey){
        TourPackage.scan().attributes(['place']).startAt(results.lastKey).exec(function(err, places){
          if(err) return completion(err, null);
          results.push(places);
          for(var i=0; i< results.length; i++){
            for (var ii in results[i].place){
              places.push(results[i].place[ii]);
            }
          }
          return completion(null, _.uniq(places));
        });
      }
      for(var i=0; i< results.length; i++){
        for (var ii in results[i].place){
          places.push(results[i].place[ii]);
        }
      }
      completion(null, _.uniq(places));
    })
  }
}
