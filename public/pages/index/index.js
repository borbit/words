require('../../js/bootstrap')

var React = require('react')
var Layout = require('../../blocks/layout/layout')
var LayoutStore = require('../..//blocks/layout/layout.store')
var FriendsStore = require('../../blocks/friends/friends.stores')
var GamesStore = require('../../blocks/games/games.stores')
var MeStore = require('../../stores/me')

FriendsStore.setState(app.friends)
GamesStore.setState(app.games)
MeStore.setState(app.me)

React.render(<Layout/>, document.getElementsByTagName('main')[0])