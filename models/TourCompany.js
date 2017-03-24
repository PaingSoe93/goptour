'use strict'

const dynamoose = require('dynamoose');

dynamoose.AWS.config.update({
  region: "ap-southeast-1"
});

var TourCompanySchema = new dynamoose.Schema({
  id: { type: String, hashKey: true },
  name: {type: String, index: {global: true} },
  company_info: Object,
  deal_info : [Object],
  problem : [Object],
  rating: {type: Number, default: 1 },
  priority: {type: Number, default: 21 },
  is_avaliable: {type: Boolean, default: true }
},
{
  throughput: {read: 5, write: 2},
  timestamps: true
});

module.exports = dynamoose.model('TourCompanies', TourCompanySchema);
