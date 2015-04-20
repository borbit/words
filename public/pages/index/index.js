require('../../js/bootstrap')

var React = require('react')
var Layout = require('../../blocks/layout/layout')
var FriendsStore = require('../../js/stores/friends')
// var GamesStore = require('../../js/stores/games')
var MeStore = require('../../js/stores/me')

// GamesStore.setState(app.games)
FriendsStore.setState(app.friends)
MeStore.setState(app.me)

React.render(<Layout/>, document.getElementsByTagName('main')[0])