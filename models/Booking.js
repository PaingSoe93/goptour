'use strict'

const dynamoose = require('dynamoose');

dynamoose.AWS.config.update({
  region: "ap-southeast-1"
});

var BookingSchema = new dynamoose.Schema({
  id : {type: String, hashKey: true},
  username : {type: String},
  phone_number : [String],
  fb_link : String,
  user_source : {type: String, default: 'Facebook'},
  package : String,
  company : String,
  price_amount: Number,
  quantity: Number,
  booking_status: {type: String, defaulf: 'pending', index: {global: true}},
  call_log: [{
    remark : {type: String, default: ''},
    time: Date
  }]
},
{
  throughput: {read: 10, write: 2},
  timestamps: true
})

module.exports = dynamoose.model('Booking', BookingSchema);
/*
{
	"id" : "abc",
	"username" : "Paing Soe",
	"phone_number": ["095099782"],
	"fb_link": "www.facebook.com/mmpitech",
	"user_source" : "Facebook",
	"package": "abc123",
	"company": "a23",
	"price_amount": 120000,
	"quantity": 4,
	"booking_status": "pending",
  "call_log": [{
    "remark": "Enquery",
    "time" : 1491542016650
  }]
}
*/
