'use strict'

const dynamoose = require('dynamoose');

dynamoose.AWS.config.update({
  region: "ap-southeast-1"
});

var PlaceSchema = new dynamoose.Schema({
  id : {type: String, hashKey: true},
  name : {type: String},
});

module.exports = dynamoose.model('Place', PlaceSchema);
