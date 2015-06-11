var _ = require('lodash')
var async = require('async')
var db = require('./db')

module.exports = {
  start(gameId, userFBId, cb) {
    let log = `START|${userFBId}`
    db.addLog(gameId, log, cb)
  },

  play(gameId, data, cb) {
    let log = 'PLAY'
    log += `|${data.userFBId}`
    log += `|${data.words.join(',')}`
    log += `|${data.score}`
    db.addLog(gameId, log, cb)
  },

  pass(gameId, userFBId, cb) {
    let log = `PASS|${userFBId}`
    db.addLog(gameId, log, cb)
  },

  swap(gameId, userFBId, cb) {
    let log = `SWAP|${userFBId}`
    db.addLog(gameId, log, cb)
  },

  resign(gameId, userFBId, cb) {
    let log = `RESIGN|${userFBId}`
    db.addLog(gameId, log, cb)
  },

  done(gameId, userFBId, cb) {
    let log = `DONE|${userFBId}`
    db.addLog(gameId, log, cb)
  },

  finish(gameId, userFBId, cb) {
    let log = `FINISH|${userFBId}`
    db.addLog(gameId, log, cb)
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