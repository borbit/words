var _ = require('lodash')
var async = require('async')
var redis = require('redis')
var uuid = require('node-uuid')
var client = redis.createClient();

function keyUser(FBId) {
  return `user:${FBId}`
}
function keyUserGames(FBId) {
  return `user_games:${FBId}`
}
function keyGame(id) {
  return `game:${id}`
}

module.exports = {
  getUser(FBId, cb) {
    var key = keyUser(FBId)
    client.hgetall(key, (err, user) => {
      if (err) return cb(err)
      cb(null, user)
    })
  },

  addUser(data, cb) {
    var id = uuid.v1()
    var user = _.defaults(data, {
      id: id, created_at: Date.now()
    })
    this.setUser(user.fb_id, user, (err) => {
      if (err) return cb(err)
      cb(null, user)
    })
  },

  setUser(FBId, data, cb) {
    var key = keyUser(FBId)
    client.hmset(key, data, (err) => {
      if (err) return cb(err)
      this.getUser(FBId, cb)
    })
  },

  addUserGame(FBId, gameId, cb) {
    var key = keyUserGames(FBId)
    client.sadd(key, gameId, (err) => {
      if (err) return cb(err)
      cb()
    })
  },

  getUserGames(FBId, cb) {
    var keys = keyUserGames(FBId)
    client.smembers(keys, (err, gameIds) => {
      if (err) return cb(err)
      cb(null, gameIds)
    })
  },
  
  getGame(id, cb) {
    var key = keyGame(id)
    client.hgetall(key, (err, game) => {
      if (err) return cb(err)
      cb(null, game)
    })
  },

  setGame(id, data, cb) {
    client.hmset(keyGame(id), data, (err) => {
      if (err) return cb(err)
      this.getGame(id, cb)
    })
  },

  addGame(data, cb) {
    var id = uuid.v1()
    var game = _.defaults(data, {
      id: id, created_at: Date.now()
    })
    async.waterfall([
      (cb) => {this.addUserGame(game.user1_fb_id, id, cb)},
      (cb) => {this.addUserGame(game.user2_fb_id, id, cb)},
      (cb) => {
        this.setGame(id, game, (err) => {
          if (err) return cb(err)
          cb(null, game)
        })
      }
    ], cb)
  },

  lookupWord(word, cb) {
    word = _.trim(word)
    word = word.toLowerCase()
    client.sismember('dict', word, (err, res) => {
      if (err) return cb(err)
      cb(null, !!+res);
    })
  }
}