var async = require('async')
var games = require('lib/games')

module.exports = (app) => {
  app.get('/games', (req, res, next) => {
    games.getUserGames(req.user.fb_id, (err, games) => {
      if (err) return next(err)
      res.json(games)
    })
  })

  app.post('/games', (req, res, next) => {
    if (!req.body.opponentFBId) {
      return next(new Error('Cannot find opponentFBId param'))
    }
    games.addGame(req.user.fb_id, req.body.opponentFBId, (err, game) => {
      if (err) return next(err)
      games.getUserGame(game.id, req.user.fb_id, (err, game) => {
        if (err) return next(err)
        res.json(game)
      })
    })
  })

  app.get('/games/:gameId', (req, res, next) => {
    games.getUserGame(req.params.gameId, req.user.fb_id, (err, game) => {
      if (err) return next(err)
      res.json(game)
    })
  })

  app.post('/games/:gameId/play', (req, res, next) => {
    if (!req.body.letters) {
      return next(new Error('Cannot find letters param'))
    }
    games.playGame(req.params.gameId, req.user.fb_id, req.body.letters, (err, game) => {
      if (err) return next(err)
      games.getUserGame(req.params.gameId, req.user.fb_id, (err, game) => {
        if (err) return next(err)
        res.json(game)
      })
    })
  })

  app.get('/games/:gameId/pass', (req, res, next) => {
    games.passGame(req.params.gameId, req.user.fb_id, (err, game) => {
      if (err) return next(err)
      games.getUserGame(req.params.gameId, req.user.fb_id, (err, game) => {
        if (err) return next(err)
        res.json(game)
      })
    })
  })
}