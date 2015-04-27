var async = require('async')
var games = require('lib/games')

module.exports = (app) => {
  app.post('/games', (req, res, next) => {
    if (!req.body.opponentFBId) {
      return next('Cannot find opponentFBId param')
    }
    games.addGame(req.user.fb_id, req.body.opponentFBId, (err, game) => {
      if (err) return next(err)
      res.json(game)
    })
  })

  app.get('/games/:gameId', (req, res, next) => {
    games.getGame(req.params.gameId, (err, game) => {
      if (err) return next(err)
      res.json(game)
    })
  })
}