var _ = require('lodash')
var async = require('async')
var React = require('react/addons')
var Layout = require('public/blocks/layout/layout')
var LayoutStore = require('public/blocks/layout/layout.store')
var FriendsStore = require('public/js/stores/friends')
var MeStore = require('public/js/stores/me')
var db = require('lib/db')
var fb = require('lib/fb')

module.exports = (app) => {
  app.get('/', (req, res, next) => {

    getFriends(req.user.facebook_token, (err, friends) => {
      if (err) return next(err)

      // GamesStore.setState(games)
      FriendsStore.setState(friends)
      MeStore.setState(req.user)

      // res.expose(games, 'games')
      res.expose(friends, 'friends')
      res.expose(req.user, 'me')

      res.render('index/index', {
        body: React.renderToString(React.createElement(Layout))
      })
    })
  })
}

function getFriends(facebookToken, cb) {
  async.waterfall([
    function(cb) {
      fb.getFriends(facebookToken, cb)
    },
    function(friends, cb) {
      async.map(friends, (friend, cb) => {
        db.getUser(friend.id, cb)
      }, cb)
    },
  ], cb)
}