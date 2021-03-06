'use strict';

var PromiseA = require('bluebird').Promise;
var request = require('request');
var requestAsync = PromiseA.promisify(request);
var testConfig = require('../config');
var JarSON = require('jarson');
var testAgent = require('../test-agent');

requestAsync({
    url: testConfig.proxyUrl + '/api/login'
  , method: 'POST'
  , json: { username: testConfig.username, password: testConfig.password }
  , agent: testAgent
  }).spread(function (resp, body) {
    if (body.error) {
      console.error('Error with login');
      console.error(body.error);
      return;
    }
    var jar = JarSON.fromJSON(body.jar);

    return requestAsync({
      url: 'https://www.lds.org/directory/services/ludrs/mem/current-user-info/'
    , jar: jar
    }).spread(function (resp, body) {
      console.log(body);
      //body = JSON.parse(body);
    });
  });
