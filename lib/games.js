const _ = require('lodash')
const async = require('async')
const db = require('lib/db')
const ya = require('lib/ya')

const LETTERS = require('./letters')
const FIELD_SIZE = 15

function shuffleLetters() {
  var letters = _.reduce(LETTERS, (m, l, key) => {
    return m.concat(_.repeat(key, l.count).split(''))
  }, [])
  for (let i = 10; i--;) {
    letters = _.shuffle(letters)
  }
  return letters.join('')
}

function serializeField(field) {
  let fieldString = ''
  for (let y = 0; y < FIELD_SIZE; y++) {
  for (let x = 0; x < FIELD_SIZE; x++) {
    fieldString += field[y][x] || ' '
  }}
  return _.trimRight(fieldString)
}

function deserializeField(fieldString) {
  let field = []
  for (let y = 0; y < FIELD_SIZE; y++) {
  for (let x = 0; x < FIELD_SIZE; x++) {
    field[y] || (field[y] = [])
    field[y][x] = fieldString[y*FIELD_SIZE+x] || ' '
  }}
  return field
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

        if (this.checkGameAvailability(game, userFBId)) {
          return cb(new Error('Game is unavailable'))
        }
        
        if (this.checkTurnAvailability(game, userFBId)) {
          return cb(new Error('Turn is unavailable'))
        }

        if (!this.checkLettersAvailability(game, letters)) {
          return cb(new Error('Letters are inacceptable'))
        }

        if (!this.checkLettersPlacement(game, letters)) {
          return cb(new Error('Letters placement is inacceptable'))
        }

        let words
        words = this.getNewWords(game, letters)
        words = _.map(words, (word) => {
          return _.map(word, (letter) => {
            return letter.letter
          }).join('')
        })
        
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
        let field = deserializeField(game.field)

        _.each(letters, (l) => {
          field[l.y][l.x] = l.letter
        })

        let turn = game.current_turn
        let updates = {
          field: serializeField(field)
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
        if (this.checkGameAvailability(game, userFBId)) {
          return cb(new Error('Game is unavailable'))
        }
        
        if (this.checkTurnAvailability(game, userFBId)) {
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

  checkGameAvailability(game, userFBId) {
    return game.user1_fb_id != userFBId &&
           game.user2_fb_id != userFBId
  },

  checkTurnAvailability(game, userFBId) {
    return (game.user1_fb_id == userFBId && game.current_turn != 1) ||
           (game.user2_fb_id == userFBId && game.current_turn != 2)
  },

  checkLettersAvailability(game, letters) {
    let turn = game.current_turn
    let valid = game[`user${turn}_letters`]
    let word = _.map(letters, l => l.letter).join('')
    
    return _.all(letters, (l) => {
      return ~valid.indexOf(l.letter)
    })
  },

  checkLettersPlacement(game, letters) {
    letters = _.sortBy(letters, l => l.y)
    letters = _.sortBy(letters, l => l.x)

    let isHor = _.uniq(_.map(letters, l => l.y)).length == 1
    let isVer = _.uniq(_.map(letters, l => l.x)).length == 1

    if (!isHor && !isVer) {
      return false
    }

    let field = deserializeField(game.field)
    let isFieldEmpty = !game.field
    let all = []

    if (isHor) {
      let letter = letters[0]
      let {x, y} = letter
      let i = 0

      while (x--) {
        if (field[y][x] && field[y][x] != ' ') {
          all.push(x)
        } else {
          break
        }
      }
      
      x = letter.x

      while (++x) {
        if (letters[i+1] && letters[i+1].x == x) {
          all.push(letters[++i].x)
        } else if (field[y][x] && field[y][x] != ' ') {
          all.push(x)
        } else if (i == letters.length - 1) {
          break
        }
      }

      all.push(letters[0].x)
      all = _.sortBy(all, x => x)
    }

    if (isVer) {
      let letter = letters[0]
      let {x, y} = letter
      let i = 0

      while (y--) {
        if (field[y] && field[y][x] != ' ') {
          all.push(y)
        } else {
          break
        }
      }
      
      y = letter.y

      while (++y) {
        if (letters[i+1] && letters[i+1].y == y) {
          all.push(letters[++i].y)
        } else if (field[y] && field[y][x] != ' ') {
          all.push(y)
        } else if (i == letters.length - 1) {
          break
        }
      }

      all.push(letters[0].y)
      all = _.sortBy(all, y => y)
    }
    
    // one word
    for (let i = 0; i < all.length; i++) {
      if (all[i+1] && all[i+1]-1 != all[i]) {
        return false
      }
    }
    
    // connect to previous
    if (!isFieldEmpty && letters.length >= all.length) {
      return false
    }

    // start from center
    if (isFieldEmpty && !_.any(letters, (letter) => {
      return letter.x == 7 && letter.y == 7
    })) {
      return false
    }

    return true
  },

  getNewWords(game, letters) {
    let all = this.getAllWords(game, letters)

    return _.filter(all, (word) => {
      return _.any(word, (wl) => {
        return _.any(letters, (ll) => {
          return wl.x == ll.x &&
                 wl.y == ll.y
        })
      })
    })
  },

  getAllWords(game, letters) {
    let field = deserializeField(game.field)
    let words = []
    let word = null

    _.each(letters, (l) => {
      field[l.y][l.x] = l.letter
    })

    // all horizontal
    for (var y = 0; y < FIELD_SIZE; y++) {
    for (var x = 0; x < FIELD_SIZE; x++) {
      if (field[y][x] != ' ') {
        word || (word = [])
        word.push({x: x, y: y, letter: field[y][x]})
      } else if (word) {
        words.push(word)
        word = null
      }
    }}

    // all vertical
    for (var x = 0; x < FIELD_SIZE; x++) {
    for (var y = 0; y < FIELD_SIZE; y++) {
      if (field[y][x] != ' ') {
        word || (word = [])
        word.push({x: x, y: y, letter: field[y][x]})
      } else if (word) {
        words.push(word)
        word = null
      }
    }}

    words = _.filter(words, (word) => {
      return word.length > 1
    })

    return words
  }
}