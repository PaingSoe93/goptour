'use strict';

const crypto = require('crypto');
const aws = require('aws-sdk');

aws.config.update({
  region: "ap-southeast-1",
});

var dynamodb = new aws.DynamoDB();
var s3 = new aws.S3();

let randomHex = () => {
	return crypto.randomBytes(24).toString('hex');
}

//file upload to s3
let s3Upload = params => {
	return new Promise((resolve, reject) => {
		s3.upload(params, (err, res) => {
			if(err){
				reject(err);
			}else {
				resolve(res.Location);
			}
		});
	});
}

module.exports = {
  randomHex,
	s3Upload
}
