require('../../js/bootstrap')

var React = require('react')
var Layout = require('../../blocks/layout/layout')
var LayoutStore = require('../..//blocks/layout/layout.store')
var FriendsStore = require('../../blocks/friends/friends.store')
var GamesStore = require('../../blocks/games/games.store')
var MeStore = require('../../js/stores/me')

GamesStore.setState(app.games)
FriendsStore.setState(app.friends)
MeStore.setState(app.me)

React.render(<Layout/>, document.getElementsByTagName('main')[0])