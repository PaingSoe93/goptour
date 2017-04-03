'use strict'

const dynamoose = require('dynamoose');

dynamoose.AWS.config.update({
  region: "ap-southeast-1"
});

var TourCompanySchema = new dynamoose.Schema({
  id: { type: String, hashKey: true },
  name: {type: String, index: {global: true} },
  company_info: {
    owner_name: String,
    email: String,
    company_license: String,
    phone_number: [String],
    fb_link: {type: String, default: ''},
    website_link: {type: String, default: ''},
    address: String,
    company_type: [String],
    company_logo: String,
    atm_card: [String]
  },
  deal_info : [{
    percent: { type: Number, default: 10},
    price_within: String,
    start_date: Date,
    expired_date: Date
  }],
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
