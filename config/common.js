const https = require('https');
const Config = require('../config/config');

// ..........................................................................
// Recaptcha Initialization
// ..........................................................................

const lsecretKey=Config.recaptch.secretKey.local;
const asecretKey=Config.recaptch.secretKey.web;
//

module.exports.verifyRecaptcha = function(key, callback) {
    https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + asecretKey + "&response=" + key, function(res) {
      var data = "";
      res.on('data', function (chunk) {
              data += chunk.toString();
      });
      res.on('end', function() {
        try {
                var parsedData = JSON.parse(data);
                callback(parsedData.success);
        } catch (e) {
                callback(false);
        }
      });
    });
  }