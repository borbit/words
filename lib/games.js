var _ = require('lodash')
var async = require('async')
var users = require('./users')
var boards = require('./boards')
var logs = require('./logs')
var chat = require('./chat')
var fb = require('./fb')
var db = require('./db')

var LETTERS = require('./letters')
var BONUSES = require('./bonuses')
var FIELD = require('./field')

function generateLetters() {
  var letters = _.reduce(LETTERS, (m, l, key) => {
    return m.concat(_.repeat(key, l.count).split(''))
  }, [])
  return _.shuffle(letters).join('')
}

function shuffleLetters(lettersString) {
  return _.shuffle(lettersString.split('')).join('')
}

module.exports = {
  addGame(userFBId, opponentFBIds, cb) {
    let userFBIds = [userFBId, ...opponentFBIds]
    let usersCount = userFBIds.length

    async.auto({
      userGames: (cb) => {
        this.getUserGames(userFBId, cb)
      },
      users(cb) {
        db.getUsers(userFBIds, cb)
      },
      game: ['users', 'userGames', (cb, data) => {
        _.each(data.users, (user, userFBId) => {
          if (!user) {
            return cb(new Error(`Cannot find user: ${userFBId}`))
          }
        })

        let active = _.filter(data.userGames, (game) => {
          return !game.finished_at
        })

        if (active.length >= 8) {
          return cb(new Error('You reached limit of max number (8) of active games'))
        }

        let unfinished = _.find(active, (game) => {
          let userFBIds = []
          for (let i = 1; i <= game.users_count; i++) {
            userFBIds.push(game[`user${i}`]['fb_id'])
          }
          let matched = _.all(opponentFBIds, (opponentFBId) => {
            return ~userFBIds.indexOf(opponentFBId)
          })
          return matched && userFBIds.length == usersCount
        })

        if (unfinished) {
          let names = []
          for (let i = 1; i <= unfinished.users_count; i++) {
            if (unfinished[`user${i}`]['fb_id'] != userFBId) {
              names.push(unfinished[`user${i}`].fb_name)
            }
          }
          return cb(new Error(`You have unfinished games with ${names.join(', ')}`))
        }
        
        let letters = generateLetters()
        let game = {
            current_turn: 1
          , users_count: usersCount
          , letters: letters.substr(0, letters.length-(usersCount*7))
          , field: ''
        }
        for (let i = 0; i < usersCount; i++) {
          game[`user${i+1}_score`] = 0
          game[`user${i+1}_fb_id`] = userFBIds[i]
          game[`user${i+1}_letters`] = letters.substring(
            letters.length-((i+1)*7)
          , letters.length-(i*7))
        }
        db.addGame(game, cb)
      }],
      log: ['game', (cb, data) => {
        logs.start(data.game.id, userFBId, cb)
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
      users: ['game', (cb, data) => {
        if (!data.game) {
          return cb(new Error(`Cannot find game: ${gameId}`))
        }
        let {game} = data
        let userFBIds = []
        for (let i = 1; i <= game.users_count; i++) {
          userFBIds.push(game[`user${i}_fb_id`])
        }
        users.getUsers(userFBIds, cb)
      }]
    }, (err, data) => {
      if (err) return cb(err)
      if (!data.game) return cb()
      let {game, users} = data
      for (let i = 1; i <= game.users_count; i++) {
        game[`user${i}`] = users[game[`user${i}_fb_id`]]
        delete game[`user${i}`].fb_access_token
      }
      cb(null, game)
    })
  },

  getGameFull(gameId, cb) {
    async.auto({
      game: (cb) => {
        this.getGame(gameId, cb)
      },
      logs: ['game', (cb, data) => {
        logs.get(data.game.id, cb)
      }],
      chat: ['game', (cb, data) => {
        chat.get(data.game.id, cb)
      }]
    }, (err, data) => {
      if (err) return cb(err)
      data.game.logs = data.logs || []
      data.game.chat = data.chat || []
      cb(null, data.game)
    })
  },

  getGameUsers(gameId, cb) {
    db.getGame(gameId, (err, game) => {
      if (err) return cb(err)
      if (!game) {
        return cb(new Error(`Cannot find game: ${gameId}`))
      }
      let userFBIds = []
      for (let i = 1; i <= game.users_count; i++) {
        userFBIds.push(game[`user${i}_fb_id`])
      }
      cb(null, userFBIds)
    })
  },

  getUserGames(userFBId, cb) {
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
  },

  getUserGame(gameId, userFBId, cb) {
    this.getGameFull(gameId, cb)
  },

  playGame(gameId, userFBId, letters, cb) {
    let updates = {}

    async.auto({
      game: (cb) => {
        db.getGame(gameId, cb)
      },
      words: ['game', (cb, data) => {
        let {game} = data
        let {field} = game

        if (!this.checkGameAvailability(game, userFBId)) {
          return cb(new Error('Game is unavailable'))
        }
        if (!this.checkTurnAvailability(game, userFBId)) {
          return cb(new Error('Turn is unavailable'))
        }
        if (!this.checkLettersAvailability(game, letters)) {
          return cb(new Error('Letters are inacceptable'))
        }
        if (!FIELD.checkPlacement(field, letters)) {
          return cb(new Error('Letters placement is inacceptable'))
        }

        let words = FIELD.defineNewWords(field, letters)

        async.forEach(words.words, (word, cb) => {
          db.lookupWord(word, (err, exist) => {
            if (err) return cb(err)
            if (!exist) {
              return cb(new Error(`Word ${word} is inacceptable`))
            }
            cb()
          })
        }, (err) => {
          if (err) return cb(err)
          cb(null, words)
        })
      }],
      play: ['words', (cb, data) => {
        let {game} = data
        let field = FIELD.deserialize(game.field)

        _.each(letters, (l) => {
          field[l.y][l.x] = l.letter
        })

        let turn = +game.current_turn
        let turnNext = turn + 1

        if (turnNext > game.users_count) {
          turnNext = 1
        }

        updates = {
          field: FIELD.serialize(field)
        , letters: game.letters.slice(0, -letters.length)
        , last_turn_at: Date.now()
        , current_turn: turnNext
        }

        let userFBId = game[`user${turn}_fb_id`]
        let userLetters = game[`user${turn}_letters`].split('')
        let userScore = +game[`user${turn}_score`]
        let userScoreNew = 0

        _.each(data.words.cells, (word) => {
          let userScore2W = false
          let userScore3W = false
          let wordScore = 0

          let prevLetters = _.filter(word, (c) => {
            return !_.any(letters, (l) => {
              return l.x == c.x && l.y == c.y
            })
          })

          let placedLetters = _.filter(word, (c) => {
            return _.any(letters, (l) => {
              return l.x == c.x && l.y == c.y
            })
          })

          _.each(prevLetters, (l) => {
            wordScore += LETTERS[l.letter].score
          })

          _.each(placedLetters, (l) => {
            let score = LETTERS[l.letter].score

            if (BONUSES[l.y]) {
              if (BONUSES[l.y][l.x] == '2L') {score *= 2}
              if (BONUSES[l.y][l.x] == '3L') {score *= 3}
              if (BONUSES[l.y][l.x] == '2W') {userScore2W = true}
              if (BONUSES[l.y][l.x] == '3W') {userScore3W = true}
            }
          
            wordScore += score
          })

          if (userScore3W) {
            wordScore *= 3
          } else if (userScore2W) {
            wordScore *= 2
          }
          
          userScoreNew += wordScore
        })
        
        _.each(letters, (l) => {
          if (l.empty) {
            userLetters.splice(userLetters.indexOf(' '), 1)
          } else {
            userLetters.splice(userLetters.indexOf(l.letter), 1)
          }
        })

        userLetters = userLetters.join('')
        userLetters += game.letters.slice(-letters.length)

        if (updates['letters'].length == 0 &&
            userLetters.length == 0) {
          let users = []

          for (let i = 1; i <= game.users_count; i++) {
            users.push({
              index: i
            , score: game[`user${i}_score`]
            , FBId: game[`user${i}_fb_id`]
            })
          }

          let winner = _.max(users, (user) => {
            return +user.score
          })

          updates['winner'] = winner.index
          updates['finished_at'] = Date.now()
          boards.incr('wins', winner.FBId, 1)
        }

        updates['id'] = gameId
        updates[`user${turn}_pocked`] = 0
        updates[`user${turn}_letters`] = userLetters
        updates[`user${turn}_score`] = userScore + userScoreNew
        boards.incr('words', userFBId, data.words.words.length)
        boards.incr('score', userFBId, userScoreNew)
        

        async.parallel([
          (cb) => {
            db.setGame(gameId, updates, cb)
          },
          (cb) => {
            logs.play(gameId, {
              userFBId: userFBId
            , words: data.words.words
            , score: userScoreNew
            }, (err, log) => {
              if (err) return cb(err)
              updates['logs'] = [log]
              cb()
            })
          }
        ], cb)
      }]
    }, (err, data) => {
      if (err) return cb(err)
      cb(null, updates)
    })
  },

  swapLetters(gameId, userFBId, indexes, cb) {
    let updates = {}

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

        let turn = +game.current_turn
        let turnNext = turn + 1

        if (turnNext > game.users_count) {
          turnNext = 1
        }

        let userLetters = game[`user${turn}_letters`].split('')
        let swapLetters = _.filter(userLetters, (__, i) => {
          return ~indexes.indexOf(i)
        }).join('')

        let gameLetters = shuffleLetters(game.letters + swapLetters)
        let nextLetters = gameLetters.slice(-swapLetters.length)

        _.each(indexes, (index, i) => {
          userLetters[index] = nextLetters[i]
        })

        updates = {}
        updates[`user${turn}_pocked`] = 0
        updates['letters'] = gameLetters.slice(0, -indexes.length)
        updates[`user${turn}_letters`] = userLetters.join('')
        updates['last_turn_at'] = Date.now()
        updates['current_turn'] = turnNext
        updates['id'] = gameId

        db.setGame(gameId, updates, cb)
      },
      (game, cb) => {
        logs.swap(gameId, userFBId, (err, log) => {
          if (err) return cb(err)
          updates['logs'] = [log]
          cb()
        })
      }
    ], (err, data) => {
      if (err) return cb(err)
      cb(null, updates)
    })
  },

  passTurn(gameId, userFBId, cb) {
    let updates = {}

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

        let turn = +game.current_turn
        let turnNext = turn + 1

        if (turnNext > game.users_count) {
          turnNext = 1
        }

        updates = {}
        updates[`user${turn}_pocked`] = 0
        updates['last_turn_at'] = Date.now()
        updates['current_turn'] = turnNext
        updates['id'] = gameId

        db.setGame(gameId, updates, cb)
      },
      (game, cb) => {
        logs.pass(gameId, userFBId, (err, log) => {
          if (err) return cb(err)
          updates['logs'] = [log]
          cb()
        })
      }
    ], (err, data) => {
      if (err) return cb(err)
      cb(null, updates)
    })
  },

  resignGame(gameId, userFBId, cb) {
    let updates = {}

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

        let users = []

        for (let i = 1; i <= game.users_count; i++) {
          let score = game[`user${i}_score`]
          let FBId = game[`user${i}_fb_id`]

          if (FBId != userFBId) {
            users.push({
              index: i
            , score: score
            , FBId: FBId
            })
          }
        }

        let winner = _.max(users, (user) => {
          return +user.score
        })

        updates = {
          finished_at: Date.now()
        , winner: winner.index
        , id: gameId
        }


        boards.incr('wins', winner.FBId, 1)
        db.setGame(gameId, updates, cb)
      },
      (game, cb) => {
        logs.resign(gameId, userFBId, (err, log) => {
          if (err) return cb(err)
          updates['logs'] = [log]
          cb()
        })
      }
    ], (err, data) => {
      if (err) return cb(err)
      cb(null, updates)
    })
  },

  doneGame(gameId, userFBId, cb) {
    let updates = {}

    async.waterfall([
      (cb) => {
        db.getGame(gameId, cb)
      },
      (game, cb) => {
        if (!this.checkGameAvailability(game, userFBId)) {
          return cb(new Error('Game is unavailable'))
        }
        if (!!game.finished_at) {
          return cb(new Error('Game is finished'))
        }

        let users = []
        let index

        for (let i = 1; i <= game.users_count; i++) {
          if (game[`user${i}_fb_id`] == userFBId) {
            index = i
          }
          users.push({
            index: i
          , done: !!game[`user${i}_done`]
          , score: game[`user${i}_score`]
          , FBId: game[`user${i}_fb_id`]
          })
        }

        let allDone = _.all(users, user => user.done)
        let winner = _.max(users, (user) => {
          return +user.score
        })

        let turn = +game.current_turn
        let turnNext = turn + 1

        if (turnNext > game.users_count) {
          turnNext = 1
        }

        updates[`user${index}_done`] = 1
        updates[`user${turn}_pocked`] = 0
        updates['current_turn'] = turnNext
        updates['id'] = gameId

        if (allDone) {
          boards.incr('wins', winner.FBId, 1)
          updates['finished_at'] = Date.now()
          updates['winner'] = winner.index

          async.waterfall([
            (cb) => {
              db.setGame(gameId, updates, cb)
            },
            (game, cb) => {
              logs.done(gameId, userFBId, (err, log) => {
                if (err) return cb(err)
                updates['logs'] = [log]
                cb()
              })
            },
            (cb) => {
              logs.finish(gameId, winner.FBId, (err, log) => {
                if (err) return cb(err)
                updates['logs'].push(log)
                cb()
              })
            }
          ], cb)
        } else {
          async.waterfall([
            (cb) => {
              db.setGame(gameId, updates, cb)
            },
            (game, cb) => {
              logs.done(gameId, userFBId, (err, log) => {
                if (err) return cb(err)
                updates['logs'] = [log]
                cb()
              })
            }
          ], cb)
        }
      }
    ], (err, data) => {
      if (err) return cb(err)
      cb(null, updates)
    })
  },

  pokeUser(gameId, userFBId, cb) {
    let updates = {}

    async.waterfall([
      (cb) => {
        db.getGame(gameId, cb)
      },
      (game, cb) => {
        if (!this.checkGameAvailability(game, userFBId)) {
          return cb(new Error('Game is unavailable'))
        }
        if (!!game.finished_at) {
          return cb(new Error('Game is finished'))
        }

        let turn = +game.current_turn
        let nextUserFBId = game[`user${turn}_fb_id`]
        let nextUserPocked = game[`user${turn}_pocked`] == 1

        if (nextUserPocked) {
          return cb(new Error('Player has been already pocked'))
        }

        updates[`user${turn}_pocked`] = 1
        updates['id'] = gameId

        async.waterfall([
          (cb) => {
            db.setGame(gameId, updates, cb)
          },
          (game, cb) => {
            fb.notify({
              userFBId: nextUserFBId
            , message: `@[${userFBId}]: рухай лiтерами!`
            , href: `/${gameId}`
            }, cb)
          },
        ], cb)
      }
    ], (err, data) => {
      if (err) return cb(err)
      cb(null, updates)
    })
  },

  checkGameAvailability(game, userFBId) {
    if (game.finished_at) {
      return false
    }
    for (let i = 1; i <= game.users_count; i++) {
      if (game[`user${i}_fb_id`] == userFBId) {
        return true
      }
    }
    return false
  },

  checkTurnAvailability(game, userFBId) {
    if (game[`user${game.current_turn}_fb_id`] == userFBId) {
      return true
    }
    return false
  },

  checkLettersAvailability(game, letters) {
    let turn = game.current_turn
    let valid = game[`user${turn}_letters`]
    let word = _.map(letters, l => l.letter).join('')
    
    return _.all(letters, (l) => {
      let index = valid.indexOf(l.letter)

      if (l.empty) {
        index = valid.indexOf(' ')
      }

      if (index >= 0) {
        let tmp = valid
        valid = tmp.substr(0, index)
        valid += tmp.substr(index + 1)
        return true
      }

      return false
    })
  }
}