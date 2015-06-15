var redis = require('redis');
var config = require('../config');

var port = config.redis_port;
var host = config.redis_host;
var client = redis.createClient(port, host);

module.exports = client;
