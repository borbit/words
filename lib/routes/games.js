var async = require('async')
var games = require('../games')
var logs = require('../logs')
var io = require('io-server')

io.on('game:listen', (client, scope, next) => {
  client.join(scope.req.gameId)
})

module.exports = (app) => {
  app.get('/games', (req, res, next) => {
    games.getUserGames(req.user.fb_id, (err, games) => {
      if (err) return next(err)
      res.json(games)
    })
  })

  app.post('/games', (req, res, next) => {
    if (!req.body.opponentFBIds) {
      return next(new Error('Cannot find opponentFBIds param'))
    }
    if (!req.body.opponentFBIds.length) {
      return next(new Error('opponentFBIds param is empty'))
    }
    games.addGame(req.user.fb_id, req.body.opponentFBIds, (err, game) => {
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
        io.broadcast(req.params.gameId, 'game:update', {
          gameId: req.params.gameId
        })
        res.json(game)
      })
    })
  })

  app.post('/games/:gameId/swap', (req, res, next) => {
    if (!req.body.letters) {
      return next(new Error('Cannot find letters param'))
    }
    games.swapLetters(req.params.gameId, req.user.fb_id, req.body.letters, (err, game) => {
      if (err) return next(err)
      games.getUserGame(req.params.gameId, req.user.fb_id, (err, game) => {
        if (err) return next(err)
        io.broadcast(req.params.gameId, 'game:update', {
          gameId: req.params.gameId
        })
        res.json(game)
      })
    })
  })

  app.get('/games/:gameId/pass', (req, res, next) => {
    games.passTurn(req.params.gameId, req.user.fb_id, (err) => {
      if (err) return next(err)
      games.getUserGame(req.params.gameId, req.user.fb_id, (err, game) => {
        if (err) return next(err)
        io.broadcast(req.params.gameId, 'game:update', {
          gameId: req.params.gameId
        })
        res.json(game)
      })
    })
  })

  app.get('/games/:gameId/resign', (req, res, next) => {
    games.resignGame(req.params.gameId, req.user.fb_id, (err) => {
      if (err) return next(err)
      games.getUserGame(req.params.gameId, req.user.fb_id, (err, game) => {
        if (err) return next(err)
        res.json(game)
      })
    })
  })

  app.get('/games/:gameId/logs', (req, res, next) => {
    logs.get(req.params.gameId, (err, logs) => {
      if (err) return next(err)
      res.json(logs)
    })
  })
}