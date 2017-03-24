'use strict'

const multiparty = require('multiparty');
const crypto = require('crypto');
const fs = require('fs');
const h = require('../helpers');

module.exports = {

	post: function(params, completion){
    var imagesUrl = [];
    new multiparty.Form().parse(params, function(err, fields, files) {
      files.images.forEach(function(file) {
            var params = {
              Key: crypto.randomBytes(10).toString('hex')+"_"+file.originalFilename,
              Bucket: "photosgrid",
              ACL:"public-read",
              Body: fs.createReadStream(file.path),
              ContentEncoding: 'base64'
            };
            h.s3Upload(params)
              .then(imageUrl => {
                imagesUrl.push(imageUrl);
                if (imagesUrl.length === files.images.length) {
                  completion(null, imagesUrl)
                }
              })
              .catch(err => completion(err, null));
        });
    });
  }
}
