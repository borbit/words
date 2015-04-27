var _ = require('lodash')
var async = require('async')
var db = require('lib/db')
var LETTERS = require('./letters')

function shuffleLetters() {
  var letters = _.map(LETTERS, (letter, key) => {
    letter = _.clone(letter)
    letter.letter = key
    return letter
  })

  var letter = null
  var letterIndex = null
  var lettersString = ''
  
  while (true) {
    letterIndex = _.random(letters.length - 1)
    letter = letters[letterIndex]
    lettersString += letter.letter
    letter.count--

    if (letter.count == 0) {
      letters.splice(letterIndex, 1)
    }
    if (letters.length == 0) {
      return lettersString
    }
  }
}

module.exports = {
  addGame(user1FBId, user2FBId, cb) {
    async.auto({
      user1(cb) {
        db.getUser(user1FBId, cb)
      },
      user2(cb) {
        db.getUser(user2FBId, cb)
      },
      game: ['user1', 'user2', (cb, data) => {
        if (!data.user1) {
          return cb(`Cannot find user1: ${user1FBId}`)
        }
        if (!data.user2) {
          return cb(`Cannot find user2: ${user2FBId}`)
        }
        db.addGame({
          letters: shuffleLetters()
        , user1_fb_id: user1FBId
        , user2_fb_id: user2FBId
        , current_turn: 1
        , user1_score: 0
        , user2_score: 0
        , field: ''
        }, cb)
      }]
    }, function(err, game) {
      if (err) return cb(err)
      cb(null, game)
    })
  },

  getGame(gameId, cb) {
    async.auto({
      game(cb) {
        db.getGame(gameId, cb)
      },
      user1: ['game', (cb, data) => {
        db.getUser(data.game.user1_fb_id, cb)
      }],
      user2: ['game', (cb, data) => {
        db.getUser(data.game.user2_fb_id, cb)
      }]
    }, (err, data) => {
      if (err) return next(err)
      delete data.user1.fb_access_token
      delete data.user2.fb_access_token
      data.game.user1 = data.user1
      data.game.user2 = data.user2
      cb(null, data.game)
    })
  },

  getGames(userFBId, cb) {
    async.waterfall([
      (cb) => {
        db.getUserGames(userFBId, cb)
      },
      (gameIds, cb) => {
        async.map(gameIds, (gameId, cb) => {
          this.getGame(gameId, cb)
        }, cb)
      }
    ], cb)
  }
}