'use strict';

var path = require('path');
var fqdn = 'local.foobar3000.com';
var port = 8043;

module.exports = {
  proxyUrl: 'https://' + fqdn + ':' + port
, hostname: fqdn
, port: port
, ca: path.join(__dirname, 'certs', 'ca', 'my-root-ca.crt.pem')
, key: path.join(__dirname, 'certs', 'client', 'my-app-client.key.pem')
, cert: path.join(__dirname, 'certs', 'client', 'my-app-client.crt.pem')
};
