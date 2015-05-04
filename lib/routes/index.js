var _ = require('lodash')
var async = require('async')
var React = require('react/addons')
var Layout = require('public/blocks/layout/layout')
var LayoutStore = require('public/blocks/layout/layout.store')
var FriendsStore = require('public/blocks/friends/friends.store')
var GamesStore = require('public/js/stores/games')
var MeStore = require('public/js/stores/me')
var Games = require('lib/games')
var db = require('lib/db')
var fb = require('lib/fb')

module.exports = (app) => {
  app.get('/', (req, res, next) => {
    async.auto({
      friends(cb) {
        getFriends(req.user, cb)
      },
      games(cb) {
        Games.getUserGames(req.user.fb_id, cb)
      }
    }, (err, data) => {
      if (err) return next(err)

      GamesStore.setState(data.games)
      FriendsStore.setState(data.friends)
      MeStore.setState(req.user)

      res.expose(data.games, 'games')
      res.expose(data.friends, 'friends')
      res.expose(req.user, 'me')

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
        db.getUser(friend.id, cb)
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