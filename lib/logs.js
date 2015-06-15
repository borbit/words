var _ = require('lodash')
var async = require('async')
var db = require('./db')

module.exports = {
  start(gameId, userFBId, cb) {
    let date = Date.now()
    let log = `START|${userFBId}|${date}`
    db.addLog(gameId, log, date, (err) => {
      if (err) return cb(err)
      cb(null, log)
    })
  },

  play(gameId, data, cb) {
    let date = Date.now()
    let log = 'PLAY'
    log += `|${date}`
    log += `|${data.userFBId}`
    log += `|${data.words.join(',')}`
    log += `|${data.score}`
    db.addLog(gameId, log, date, (err) => {
      if (err) return cb(err)
      cb(null, log)
    })
  },

  pass(gameId, userFBId, cb) {
    let date = Date.now()
    let log = `PASS|${date}|${userFBId}`
    db.addLog(gameId, log, date, (err) => {
      if (err) return cb(err)
      cb(null, log)
    })
  },

  swap(gameId, userFBId, cb) {
    let date = Date.now()
    let log = `SWAP|${date}|${userFBId}`
    db.addLog(gameId, log, date, (err) => {
      if (err) return cb(err)
      cb(null, log)
    })
  },

  resign(gameId, userFBId, cb) {
    let date = Date.now()
    let log = `RESIGN|${date}|${userFBId}`
    db.addLog(gameId, log, date, (err) => {
      if (err) return cb(err)
      cb(null, log)
    })
  },

  done(gameId, userFBId, cb) {
    let date = Date.now()
    let log = `DONE|${date}|${userFBId}`
    db.addLog(gameId, log, date, (err) => {
      if (err) return cb(err)
      cb(null, log)
    })
  },

  finish(gameId, userFBId, cb) {
    let date = Date.now()
    let log = `FINISH|${date}|${userFBId}`
    db.addLog(gameId, log, date, (err) => {
      if (err) return cb(err)
      cb(null, log)
    })
  },

  get(gameId, cb) {
    db.getLogs(gameId, (err, list) => {
      if (err) return cb(err)
      cb(null, list);
    })
  }
}