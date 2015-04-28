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

        var letters = shuffleLetters()
        var user1Letters = letters.substring(letters.length-7, letters.length)
        var user2Letters = letters.substring(letters.length-14, letters.length-7)
        letters = letters.substr(0, letters.length-14)

        db.addGame({
          letters: letters
        , user1_fb_id: user1FBId
        , user2_fb_id: user2FBId
        , user1_letters: user1Letters 
        , user2_letters: user2Letters
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

  getUserGames(userFBId, cb) {
    async.waterfall([
      (cb) => {
        db.getUserGames(userFBId, cb)
      },
      (gameIds, cb) => {
        async.map(gameIds, (gameId, cb) => {
          this.getUserGame(gameId, userFBId, cb)
        }, cb)
      }
    ], cb)
  },

  getUserGame(gameId, userFBId, cb) {
    this.getGame(gameId, (err, game) => {
      if (err) return cb(err)
      var data = {
        field: game.field
      , letters_count: game.letters.length
      , created_at: game.created_at
      , id: game.id
      }
      if (game.user1_fb_id == userFBId) {
        data.my_turn = game.current_turn == 1
        data.my_score = game.user1_score
        data.my_letters = game.user1_letters
        data.opponent_score = game.user2_score
        data.opponent = game.user2
      }
      if (game.user2_fb_id == userFBId) {
        data.my_turn = game.current_turn == 2
        data.my_score = game.user2_score
        data.my_letters = game.user2_letters
        data.opponent_score = game.user1_score
        data.opponent = game.user1
      }
      cb(null, data)
    })
  }
}