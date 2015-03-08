'use strict';

var https = require('https');
var fs = require('fs');
var testConfig = require('./config');
var options;

options = {
  host: testConfig.hostname
, port: testConfig.port
, path: '/'
, ca: [ fs.readFileSync(testConfig.ca) ]
, key: fs.readFileSync(testConfig.key)
, cert: fs.readFileSync(testConfig.cert)
};

module.exports = new https.Agent(options);
