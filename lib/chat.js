var _ = require('lodash')
var async = require('async')
var db = require('./db')

module.exports = {
  addMessage(gameId, userFBId, message, cb) {
    let date = Date.now()
    message = `${userFBId}|${message}`
    db.addMessage(gameId, message, date, (err) => {
      if (err) return cb(err)
      cb(null, {
        message: message
      , date: date
      })
    })
  },

  get(gameId, cb) {
    db.getMessages(gameId, (err, messages) => {
      if (err) return cb(err)
      let chat = []
      for (let i = 0; i < messages.length; i += 2) {
        chat.push({
          message: messages[i]
        , date: messages[i+1]
        })
      }
      cb(null, chat)
    })
  }
}