var _ = require('lodash')
var async = require('async')
var boards = require('./boards')
var db = require('./db')
var fb = require('lib/fb')

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
  },

  getFriends(fbAccessToken, cb) {
    async.waterfall([
      (cb) => {
        fb.getFriends(fbAccessToken, cb)
      },
      (friends, cb) => {
        async.map(friends, (friend, cb) => {
          this.getUser(friend.id, cb)
        }, cb)
      },
    ], (err, friends) => {
      if (err) return cb(err)
      friends = _.filter(friends, (friend) => {
        return friend
      })
      friends = _.map(friends, (friend) => {
        return _.omit(friend, 'fb_token')
      })
      cb(null, friends)
    })
  },

  getAllUsers(cb) {
    db.getAllUserFBIds((err, userFBIds) => {
      if (err) return cb(err)
      this.getUsers(userFBIds, (err, users) => {
        if (err) return cb(err)
        users = _.map(users, (user) => {
          return _.omit(user, 'fb_token')
        })
        cb(null, users)
      })
    })
  }
})