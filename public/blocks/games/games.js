var React = require('react')
var Reflux = require('reflux')
var {PureRenderMixin} = React.addons
var LayoutActions = require('../layout/layout.actions')
var GamesStore = require('../../js/stores/games')
var GameStore = require('../../js/stores/game')
var MeStore = require('../../js/stores/me')
var render = require('./games.jsx')

module.exports = React.createClass({
  mixins: [
    Reflux.connect(GamesStore, 'games')
  , Reflux.connect(GameStore, 'game')
  , Reflux.connect(MeStore, 'me')
  , PureRenderMixin
  ],

  getInitialState() {
    return {
      games: GamesStore.getState()
    , game: GameStore.getState()
    , me: MeStore.getState()
    }
  },

  onNewClick() {
    LayoutActions.newOpen()
  },

  render() {
    return render.call(this)
  }
})