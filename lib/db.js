var redis = require('redis')
var client = redis.createClient();

module.exports = {
  getUser(facebookId, cb) {
    client.hgetall(`user:${facebookId}`, cb)
  },
  setUser(data, cb) {
    client.hmset(`user:${data.facebook_id}`, data, cb)
  }
}