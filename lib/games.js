const _ = require('lodash')
const async = require('async')
const db = require('./db')
const ya = require('./ya')

const LETTERS = require('./letters')
const FIELD = require('./field')

function shuffleLetters() {
  var letters = _.reduce(LETTERS, (m, l, key) => {
    return m.concat(_.repeat(key, l.count).split(''))
  }, [])
  for (let i = 10; i--;) {
    letters = _.shuffle(letters)
  }
  return letters.join('')
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
          return cb(new Error(`Cannot find user1: ${user1FBId}`))
        }
        if (!data.user2) {
          return cb(new Error(`Cannot find user2: ${user2FBId}`))
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
    }, function(err, data) {
      if (err) return cb(err)
      cb(null, data.game)
    })
  },

  getGame(gameId, cb) {
    async.auto({
      game(cb) {
        db.getGame(gameId, cb)
      },
      user1: ['game', (cb, data) => {
        if (!data.game) {
          return cb(new Error(`Cannot find game: ${gameId}`))
        }
        db.getUser(data.game.user1_fb_id, cb)
      }],
      user2: ['game', (cb, data) => {
        if (!data.game) {
          return cb(new Error(`Cannot find game: ${gameId}`))
        }
        db.getUser(data.game.user2_fb_id, cb)
      }]
    }, (err, data) => {
      if (err) return cb(err)
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
      , last_turn_at: game.last_turn_at
      , created_at: game.created_at
      , id: game.id
      }
      if (game.finished_at) {
        data.finished_at = game.finished_at
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
  },

  playGame(gameId, userFBId, letters, cb) {
    async.auto({
      game: (cb) => {
        db.getGame(gameId, cb)
      },
      lookup: ['game', (cb, data) => {
        let {game} = data

        if (!this.checkGameAvailability(game, userFBId)) {
          return cb(new Error('Game is unavailable'))
        }
        if (!this.checkTurnAvailability(game, userFBId)) {
          return cb(new Error('Turn is unavailable'))
        }
        if (!this.checkLettersAvailability(game, letters)) {
          return cb(new Error('Letters are inacceptable'))
        }
        if (FIELD.findPlacementErrors(game.field, letters)) {
          return cb(new Error('Letters placement is inacceptable'))
        }

        let words = FIELD.defineNewWords(game.field, letters)
        
        async.forEach(words, (word, cb) => {
          ya.lookup(word, (err, def) => {
            if (err) return cb(err)
            if (!def.length) {
              return cb(new Error(`Words ${words.join(', ')} are inacceptable`))
            }
            cb()
          })
        }, cb)
      }],
      play: ['lookup', (cb, data) => {
        let {game} = data
        let field = FIELD.deserialize(game.field)

        _.each(letters, (l) => {
          field[l.y][l.x] = l.letter
        })

        let turn = game.current_turn
        let updates = {
          field: FIELD.serialize(field)
        , letters: game.letters.slice(0, -letters.length)
        , current_turn: turn == 1 ? 2 : 1
        , last_turn_at: Date.now()
        }

        let word = _.map(letters, l => l.letter)
        let userScore = +game[`user${turn}_score`]
        let userLetters = game[`user${turn}_letters`].split('')
        let userLettersNext = game.letters.slice(-word.length)

        for (let i = 0, j; i < userLetters.length; i++) {
          if ((j = word.indexOf(userLetters[i])) < 0) {
            userLettersNext += userLetters[i]
          } else {
            word.splice(j, 1)
          }
        }

        updates[`user${turn}_score`] = userScore + letters.length
        updates[`user${turn}_letters`] = userLettersNext
        db.setGame(gameId, updates, cb)
      }]
    }, cb)
  },

  passGame(gameId, userFBId, cb) {
    async.waterfall([
      (cb) => {
        db.getGame(gameId, cb)
      },
      (game, cb) => {
        if (!this.checkGameAvailability(game, userFBId)) {
          return cb(new Error('Game is unavailable'))
        }
        if (!this.checkTurnAvailability(game, userFBId)) {
          return cb(new Error('Turn is unavailable'))
        }

        let turn = game.current_turn
        let updates = {
          current_turn: turn == 1 ? 2 : 1
        , last_turn_at: Date.now()
        }

        db.setGame(gameId, updates, cb)
      }
    ], cb)
  },

  resignGame(gameId, userFBId, cb) {
    async.waterfall([
      (cb) => {
        db.getGame(gameId, cb)
      },
      (game, cb) => {
        if (!this.checkGameAvailability(game, userFBId)) {
          return cb(new Error('Game is unavailable'))
        }
        if (!!game.finished_at) {
          return cb(new Error('Resign is unavailable'))
        }

        db.setGame(gameId, {
          finished_at: Date.now()
        }, cb)
      }
    ], cb)
  },

  checkGameAvailability(game, userFBId) {
    return (game.user1_fb_id == userFBId) ||
           (game.user2_fb_id == userFBId)
  },

  checkTurnAvailability(game, userFBId) {
    return (game.user1_fb_id == userFBId && game.current_turn == 1) ||
           (game.user2_fb_id == userFBId && game.current_turn == 2)
  },

  checkLettersAvailability(game, letters) {
    let turn = game.current_turn
    let valid = game[`user${turn}_letters`]
    let word = _.map(letters, l => l.letter).join('')
    
    return _.all(letters, (l) => {
      return ~valid.indexOf(l.letter)
    })
  }
}