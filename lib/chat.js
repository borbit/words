var _ = require('lodash')
var async = require('async')
var db = require('./db')

module.exports = {
  addMessage(gameId, userFBId, message, cb) {
    let date = Date.now()
    message = `${userFBId}|${date}|${message}`
    db.addMessage(gameId, message, date, (err) => {
      if (err) return cb(err)
      cb(null, message)
    })
  },

  get(gameId, cb) {
    db.getMessages(gameId, (err, messages) => {
      if (err) return cb(err)
      cb(null, messages)
    })
  }
}