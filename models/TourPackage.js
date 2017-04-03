'use strict'

const dynamoose = require('dynamoose');

dynamoose.AWS.config.update({
  region: "ap-southeast-1"
});

var TourPackageSchema = new dynamoose.Schema({
  id: {type: String, hashKey: true},
  title: {type: String, index: {global: true} },
  info: {
    quick_info: {
      duration: String,
      currency: String,
      price: Number,
      car_type: String,
      hotel_type: String,
      route: String
    },
    detail_info: {
      intro: String,
      trip_plan: [String],
      services: [String]
    }
  },
  company: Object,
  image_url : [String],
  categories : [String],
  state: [String],
  place: [String],
  date: [{
    start_date: {type: Date, index: true},
    end_date: Date,
    is_expired: Boolean
  }],
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
