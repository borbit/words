var _ = require('lodash')
var async = require('async')
var config = require('config')
var React = require('react/addons')
var Layout = require('public/blocks/layout/layout')
var LayoutStore = require('public/blocks/layout/layout.store')
var FriendsStore = require('public/blocks/friends/friends.store')
var GamesStore = require('public/js/stores/games')
var GameStore = require('public/js/stores/game')
var LogsStore = require('public/js/stores/logs')
var MeStore = require('public/js/stores/me')
var games = require('lib/games')
var users = require('lib/users')
var logs = require('lib/logs')
var db = require('lib/db')
var fb = require('lib/fb')

module.exports = (app) => {
  app.get('/', (req, res, next) => {
    async.auto({
      friends(cb) {
        getFriends(req.user, cb)
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
      logs: ['games', (cb, data) => {
        if (data.games[0]) {
          logs.get(data.games[0].id, cb)
        } else {
          process.nextTick(cb)
        }
      }]
    }, (err, data) => {
      if (err) return next(err)
      if (data.games[0]) {
        GameStore.setState(data.games[0])
        LogsStore.setState(data.logs)
      }
      
      GamesStore.setState(data.games)
      FriendsStore.setState(data.friends)
      MeStore.setState(req.user)

      res.expose(data.games, 'games')
      res.expose(data.friends, 'friends')
      res.expose(data.logs, 'logs')
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

function getFriends(user, cb) {
  async.waterfall([
    function(cb) {
      fb.getFriends(user.fb_access_token, cb)
    },
    function(friends, cb) {
      async.map(friends, (friend, cb) => {
        users.getUser(friend.id, cb)
      }, cb)
    },
  ], (err, friends) => {
    if (err) return cb(err)
    friends = _.filter(friends, (friend) => {
      return friend
    })
    friends = _.map(friends, (friend) => {
      return _.omit(friend, 'fb_token')
    })
    cb(null, friends)
  })
}