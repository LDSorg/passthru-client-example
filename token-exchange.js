'use strict';

var PromiseA = require('bluebird').Promise;
var request = require('request');
var requestAsync = PromiseA.promisify(request);
var testConfig = require('./config');
var JarSON = require('jarson');
var testAgent = require('./test-agent');
// don't really store secrets in a module as they would stay cached unencrypted in memory
// this is just for a short-lived test, not a long-running process
var username = require('./real-secret.js').username;
var password = require('./real-secret.js').password;

requestAsync({
  url: testConfig.proxyUrl + '/api/login'
, method: 'POST'
, json: { username: username, password: password }
, agent: testAgent
}).spread(function (resp, body) {
  console.log('sign-in result');
  console.log(body);

  if (!body.token) {
    throw new Error('Invalid Credentials');
  }

  return requestAsync({
    url: testConfig.proxyUrl + '/api/passthru'
  , method: 'POST'
  , json: { token: body.token }
  , agent: testAgent
  }).spread(function (resp, body) {
    if (!body.jar) {
      throw new Error('Token Credentials');
    }

    console.log('token exchange result');
    var jar = JarSON.fromJSON(body.jar)
      ;

    return requestAsync({
      url: 'https://www.lds.org/directory/services/ludrs/mem/current-user-info/'
    , jar: jar
    }).spread(function (resp, body) {
      console.log('access result');
      console.log(body);
    });
  });
});
