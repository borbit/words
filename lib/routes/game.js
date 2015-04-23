var async = require('async')
var db = require('lib/db')

module.exports = (app) => {
  app.post('/games', (req, res, next) => {
    var opponentFBId = req.body.opponentFBId

    if (!opponentFBId) {
      return next('Cannot find opponentFBId param')
    }

    async.waterfall([
      function(cb) {
        db.getUser(opponentFBId, cb)
      },
      function(opponent, cb) {
        if (!opponent) {
          return cb(`Cannot find user with FBId: ${opponentFBId}`)
        }
        db.addGame({
          user1: req.user.fb_id
        , user2: opponent.fb_id
        }, cb)
      }
    ], function(err, game) {
      if (err) return next(err)
      res.json(game)
    })
  })

  app.get('/games/:gameId', (req, res, next) => {
    async.auto({
      game(cb) {
        db.getGame(req.params.gameId, cb)
      },
      user1: ['game', (cb, data) => {
        db.getUser(data.game.user1, cb)
      }],
      user2: ['game', (cb, data) => {
        db.getUser(data.game.user2, cb)
      }]
    }, (err, data) => {
      if (err) return next(err)
      delete data.user1.fb_access_token
      delete data.user2.fb_access_token
      data.game.user1 = data.user1
      data.game.user2 = data.user2
      res.json(data.game)
    })
  })
}