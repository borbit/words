var _ = require('lodash')
var async = require('async')
var boards = require('./boards')
var db = require('./db')

_.extend(module.exports, {
  getUser(userFBId, cb) {
    db.getUser(userFBId, (err, user) => {
      if (err) return cb(err)
      if (!user) return cb(null, null)
      boards.ranks(userFBId, (err, ranks) => {
        if (err) return cb(err)
        user.ranks = ranks 
        cb(null, user)
      })
    })
  },

  getUsers(userFBIds, cb) {
    async.reduce(userFBIds, {}, (m, userFBId, cb) => {
      this.getUser(userFBId, (err, user) => {
        if (err) return cb(err)
        m[userFBId] = user
        cb(null, m)
      })
    }, cb)
  }
})