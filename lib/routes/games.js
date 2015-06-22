var io = require('io-server')
var async = require('async')
var games = require('../games')
var logs = require('../logs')
var chat = require('../chat')
var fb = require('../fb')

io.on('user:connect', (client, scope, next) => {
  client.join(scope.req.userFBId)
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
    if (req.body.opponentFBIds.length > 3) {
      return next(new Error('Maximum 3 opponents available'))
    }
    games.addGame(req.user.fb_id, req.body.opponentFBIds, (err, game) => {
      if (err) return next(err)
      games.getUserGame(game.id, req.user.fb_id, (err, game) => {
        if (err) return next(err)
        broadcastNewGame(game, req.user.fb_id)
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
    games.playGame(req.params.gameId, req.user.fb_id, req.body.letters, (err, updates) => {
      if (err) return next(err)
      broadcastGameUpdates(req.params.gameId, req.user.fb_id, updates)
      res.json(updates)
    })
  })

  app.post('/games/:gameId/swap', (req, res, next) => {
    if (!req.body.letters) {
      return next(new Error('Cannot find letters param'))
    }
    games.swapLetters(req.params.gameId, req.user.fb_id, req.body.letters, (err, updates) => {
      if (err) return next(err)
      broadcastGameUpdates(req.params.gameId, req.user.fb_id, updates)
      res.json(updates)
    })
  })

  app.get('/games/:gameId/pass', (req, res, next) => {
    games.passTurn(req.params.gameId, req.user.fb_id, (err, updates) => {
      if (err) return next(err)
      broadcastGameUpdates(req.params.gameId, req.user.fb_id, updates)
      res.json(updates)
    })
  })

  app.get('/games/:gameId/resign', (req, res, next) => {
    games.resignGame(req.params.gameId, req.user.fb_id, (err, updates) => {
      if (err) return next(err)
      broadcastGameUpdates(req.params.gameId, req.user.fb_id, updates)
      res.json(updates)
    })
  })

  app.get('/games/:gameId/done', (req, res, next) => {
    games.doneGame(req.params.gameId, req.user.fb_id, (err, updates) => {
      if (err) return next(err)
      broadcastGameUpdates(req.params.gameId, req.user.fb_id, updates)
      res.json(updates)
    })
  })

  app.get('/games/:gameId/poke', (req, res, next) => {
    games.getUserGame(req.params.gameId, req.user.fb_id, (err, game) => {
      if (err) return next(err)

      let userFBId = game[`user${game.current_turn}`].fb_id

      fb.notify(req.user.fb_access_token, {
        userFBId: userFBId
      , message: `@[${req.user.fb_id}] нагадує тобі що зараз твій хід`
      , href: `/${game.id}`
      }, (err, data) => {
        if (err) return next(err)
        res.end()
      })
    })
  })

  app.post('/games/:gameId/chat', (req, res, next) => {
    if (!req.body.message || !req.body.message.length) {
      return next(new Error('Cannot find message param'))
    }
    chat.addMessage(req.params.gameId, req.user.fb_id, req.body.message, (err, message) => {
      if (err) return next(err)
      broadcastChatMessage(req.params.gameId, req.user.fb_id, message)
      res.json({id: req.params.gameId, chat: [message]})
    })
  })

  app.get('/games/:gameId/logs', (req, res, next) => {
    logs.get(req.params.gameId, (err, logs) => {
      if (err) return next(err)
      res.json(logs)
    })
  })
}

function broadcastGameUpdates(gameId, userFBId, updates) {
  games.getGameUsers(gameId, (err, userFBIds) => {
    if (err) return console.error(err)
    userFBIds = userFBIds.filter(id => id != userFBId)
    userFBIds.forEach((userFBId) => {
      io.broadcast(userFBId, 'game:update', updates)
    })
  })
}

function broadcastNewGame(game, userFBId) {
  games.getGameUsers(game.id, (err, userFBIds) => {
    if (err) return console.error(err)
    userFBIds = userFBIds.filter(id => id != userFBId)
    userFBIds.forEach((userFBId) => {
      io.broadcast(userFBId, 'game:new', game)
    })
  })
}

function broadcastChatMessage(gameId, userFBId, message) {
  games.getGameUsers(gameId, (err, userFBIds) => {
    if (err) return console.error(err)
    userFBIds = userFBIds.filter(id => id != userFBId)
    userFBIds.forEach((userFBId) => {
      io.broadcast(userFBId, 'game:message', {
        id: gameId, chat: [message]
      })
    })
  })
}



