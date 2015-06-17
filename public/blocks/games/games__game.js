var React = require('react')
var {PureRenderMixin} = React.addons
var GameActions = require('../../js/actions/game')
var GamesActions = require('../../js/actions/games')
var render = require('./games__game.jsx')

module.exports = React.createClass({
  mixins: [
    PureRenderMixin
  ],

  onPlay() {
    let gameId = this.props.game.get('id')
    GamesActions.clearNotifications(gameId)
    GameActions.get(gameId)
  },

  render() {
    return render.call(this)
  }
})