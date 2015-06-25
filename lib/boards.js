var Board = require('leaderboard')
var users = require('./users')
var moment = require('moment')
var async = require('async')
var _ = require('lodash')

var boards = {}
var boardNames = [
  'score'
, 'words'
, 'wins'
]
var boardTypes = [
  'general'
, 'daily'
]

function getBoard(type, name) {
  name = getBoardName(type, name)
  if (!boards[name]) {
    boards[name] = new Board(`board_${name}`)
  }
  return boards[name]
}

function getBoardName(type, name) {
  if (type == 'daily') {
    return `${name}_${moment().format('YYYY_MM_DD')}`
  } else {
    return name
  }
}

_.extend(module.exports, {
  incr(name, userId, score, cb) {
    async.parallel([
      (cb) => {getBoard('general', name).incr(userId, score, cb)},
      (cb) => {getBoard('daily', name).incr(userId, score, cb)}
    ], cb)
  },

  rank(type, name, userId, cb) {
    getBoard(type, name).rank(userId, cb)
  },

  ranks(userId, cb) {
    let ranks = {}
    
    async.each(boardTypes, (type, cb) => {
      async.each(boardNames, (name, cb) => {
        this.rank(type, name, userId, (err, rank) => {
          if (err) return cb(err)
          ranks[type] || (ranks[type] = {})
          ranks[type][name] = rank
          cb()
        })
      }, cb)
    }, (err) => {
      if (err) return cb(err)
      cb(null, ranks)
    })
  },

  list(type, name, cb) {
    getBoard(type, name).list((err, list) => {
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