var _ = require('lodash')
var async = require('async')
var config = require('config')
var React = require('react/addons')
var Layout = require('public/blocks/layout/layout')
var LayoutStore = require('public/blocks/layout/layout.store')
var FriendsStore = require('public/js/stores/friends')
var UsersStore = require('public/js/stores/users')
var GamesStore = require('public/js/stores/games')
var GameStore = require('public/js/stores/game')
var MeStore = require('public/js/stores/me')
var games = require('lib/games')
var users = require('lib/users')
var logs = require('lib/logs')
var chat = require('lib/chat')

module.exports = (app) => {
  app.get('/', (req, res, next) => {
    async.auto({
      users(cb) {
        users.getAllUsers(cb)
      },
      friends(cb) {
        users.getFriends(req.user.fb_access_token, cb)
      },
      games(cb) {
        games.getUserGames(req.user.fb_id, (err, games) => {
          if (err) return cb(err)
          games = _.sortBy(games, (game) => {
            return -(game['last_turn_at'] || game['created_at'])
          })
          games = _.sortBy(games, (game) => {
            return game['my_turn'] ? 0 : 1
          })
          cb(null, games)
        })
      },
      game: ['games', (cb, data) => {
        if (data.games[0]) {
          games.getUserGame(data.games[0].id, req.user.fb_id, cb)
        } else {
          process.nextTick(cb)
        }
      }]
    }, (err, data) => {
      if (err) return next(err)
      
      GameStore.setState(data.game)
      GamesStore.setState(data.games)
      FriendsStore.setState(data.friends)
      UsersStore.setState(data.users)
      MeStore.setState(req.user)

      res.expose(data.game, 'game')
      res.expose(data.games, 'games')
      res.expose(data.friends, 'friends')
      res.expose(data.users, 'users')
      res.expose(data.logs, 'logs')
      res.expose(data.chat, 'chat')
      res.expose(req.user, 'me')
      res.expose({
        port: config.port
      , port_io: config.port_io
      , host: config.host
      }, 'config')

      res.render('index/index', {
        body: React.renderToString(React.createElement(Layout))
      })
    })
  })
}