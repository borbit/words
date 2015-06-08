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
function keyGame(gameId) {
  return `game:${gameId}`
}
function keyLogs(gameId) {
  return `logs:${gameId}`
}

module.exports = {
  getUser(FBId, cb) {
    var key = keyUser(FBId)
    client.hgetall(key, (err, user) => {
      if (err) return cb(err)
      cb(null, user)
    })
  },

  getUsers(FBIds, cb) {
    async.reduce(FBIds, {}, (m, FBId, cb) => {
      this.getUser(FBId, (err, user) => {
        if (err) return cb(err)
        m[FBId] = user
        cb(null, m)
      })
    }, cb)
  },

  getAllUserFBIds(cb) {
    client.keys('user:*', (err, keys) => {
      if (err) return cb(err)
      let FBIds = _.map(keys, key => key.replace('user:', ''))
      cb(null, FBIds)
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
    var key = keyUserGames(FBId)
    client.smembers(key, (err, gameIds) => {
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
    var key = keyGame(id)
    client.hmset(key, data, (err) => {
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
      (cb) => {
        async.times(game.users_count, (i, cb) => {
          this.addUserGame(game[`user${i+1}_fb_id`], id, cb)
        }, (err) => {
          if (err) return cb(err)
          cb()
        })
      },
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
  },

  addLog(gameId, log, cb) {
    let key = keyLogs(gameId)
    let args = [key, Date.now(), log]
    client.zadd(args, (err) => {
      if (err) return cb(err)
      cb()
    })
  },

  getLogs(gameId, cb) {
    let key = keyLogs(gameId)
    let args = [key, 0, -1, 'WITHSCORES']
    client.zrevrange(args, (err, logs) => {
      if (err) return cb(err)
      cb(null, logs)
    });
  },

  scanDict(pattern, cb) {
    let words = []
    function scan(cursor = 0) {
      let args = [
        'dict', cursor
      , 'match', pattern
      ]
      client.sscan(args, (err, res) => {
        if (err) return cb(err)
        words = words.concat(res[1])
        if (res[0] != 0) {
          return scan(res[0])
        }
        cb(null, words)
      });
    }
    scan()
  }
}