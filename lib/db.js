var _ = require('lodash')
var redis = require('redis')
var uuid = require('node-uuid')
var client = redis.createClient();

function keyUser(fbId) {
  return `user:${fbId}`
}
function keyGame(id) {
  return `game:${id}`
}

module.exports = {
  getUser(fbId, cb) {
    client.hgetall(keyUser(fbId), cb)
  },

  addUser(data, cb) {
    var id = uuid.v1()
    var user = _.defaults(data, {
      id: id
    })
    this.setUser(user.fb_id, user, (err) => {
      if (err) return cb(err)
      cb(null, user)
    })
  },

  setUser(fbId, data, cb) {
    client.hmset(keyUser(fbId), data, (err) => {
      if (err) return cb(err)
      this.getUser(fbId, cb)
    })
  },
  
  getGame(id, cb) {
    client.hgetall(keyGame(id), cb)
  },

  addGame(data, cb) {
    var id = uuid.v1()
    var game = _.defaults(data, {
      id: id
    })
    this.setGame(id, game, (err) => {
      if (err) return cb(err)
      cb(null, game)
    })
  },

  setGame(id, data, cb) {
    client.hmset(keyGame(id), data, (err) => {
      if (err) return cb(err)
      this.getGame(id, cb)
    })
  }
}