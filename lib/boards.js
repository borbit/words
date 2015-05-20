var Board = require('leaderboard')
var users = require('./users')
var async = require('async')
var _ = require('lodash')

var boards = {}
var boardNames = [
  'score'
]

function getBoard(name) {
  if (!boards[name]) {
    boards[name] = new Board(`board_${name}`)
  }
  return boards[name]
}

_.extend(module.exports, {
  incr(name, userId, score, cb) {
    getBoard(name).incr(userId, score, cb)
  },

  rank(name, userId, cb) {
    getBoard(name).rank(userId, cb)
  },

  ranks(userId, cb) {
    let ranks = {}
    async.each(boardNames, (name, cb) => {
      this.rank(name, userId, (err, rank) => {
        if (err) return cb(err)
        ranks[name] = rank
        cb()
      })
    }, (err) => {
      if (err) return cb(err)
      cb(null, ranks)
    })
  },

  list(name, cb) {
    getBoard(name).list((err, list) => {
      if (err) return cb(err)
      async.each(list, (item, cb) => {
        users.getUser(item.member, (err, user) => {
          if (err) return cb(err)
          item.user = user
          cb()
        })
      }, (err) => {
        if (err) return cb(err)
        cb(null, list)
      })
    })
  }
})