var _ = require('lodash')
var async = require('async')
var db = require('./db')

module.exports = {
  addMessage(gameId, userFBId, message, cb) {
    db.addChatMessage(gameId, `${userFBId}|${message}`, cb)
  },

  get(gameId, cb) {
    db.getChat(gameId, (err, messages) => {
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