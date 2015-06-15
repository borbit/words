var _ = require('lodash')
var async = require('async')
var db = require('./db')

module.exports = {
  start(gameId, userFBId, cb) {
    let log = `START|${userFBId}`
    db.addLog(gameId, log, cb)
  },

  play(gameId, data, cb) {
    let date = Date.now()
    let log = 'PLAY'
    log += `|${data.userFBId}`
    log += `|${data.words.join(',')}`
    log += `|${data.score}`
    db.addLog(gameId, log, date, (err) => {
      if (err) return cb(err)
      cb(null, {
        date: date
      , log: log
      })
    })
  },

  pass(gameId, userFBId, cb) {
    let date = Date.now()
    let log = `PASS|${userFBId}`
    db.addLog(gameId, log, date, (err) => {
      if (err) return cb(err)
      cb(null, {
        date: date
      , log: log
      })
    })
  },

  swap(gameId, userFBId, cb) {
    let date = Date.now()
    let log = `SWAP|${userFBId}`
    db.addLog(gameId, log, (err) => {
      if (err) return cb(err)
      cb(null, {
        date: date
      , log: log
      })
    })
  },

  resign(gameId, userFBId, cb) {
    let date = Date.now()
    let log = `RESIGN|${userFBId}`
    db.addLog(gameId, log, date, (err) => {
      if (err) return cb(err)
      cb(null, {
        date: date
      , log: log
      })
    })
  },

  done(gameId, userFBId, cb) {
    let date = Date.now()
    let log = `DONE|${userFBId}`
    db.addLog(gameId, log, date, (err) => {
      if (err) return cb(err)
      cb(null, {
        date: date
      , log: log
      })
    })
  },

  finish(gameId, userFBId, cb) {
    let date = Date.now()
    let log = `FINISH|${userFBId}`
    db.addLog(gameId, log, date, (err) => {
      if (err) return cb(err)
      cb(null, {
        date: date
      , log: log
      })
    })
  },

  get(gameId, cb) {
    db.getLogs(gameId, (err, list) => {
      if (err) return cb(err)
      let logs = []
      for (let i = 0; i < list.length; i += 2) {
        logs.push({date: list[i+1], log: list[i]})
      }
      cb(null, logs);
    })
  }
}