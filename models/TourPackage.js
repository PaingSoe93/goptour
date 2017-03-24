'use strict'

const dynamoose = require('dynamoose');

dynamoose.AWS.config.update({
  region: "ap-southeast-1"
});

var TourPackageSchema = new dynamoose.Schema({
  id: {type: String, hashKey: true},
  title: {type: String, index: {global: true} },
  info: Object,
  company: Object,
  image_url : {type: [String] },
  categories : [String],
  state: Object,
  place: [String],
  date: [Object],
  type: {type: String, index: {global: true} },
  priority: {type: Number, default: 21 },
  is_special: {type: Boolean, default: true },
  is_avaliable: {type: Boolean, default: true }
},
{
  throughput: {read: 10, write: 2},
  timestamps: true
});

module.exports = dynamoose.model('TourPackages', TourPackageSchema);
