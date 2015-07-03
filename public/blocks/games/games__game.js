var React = require('react')
var Waves = require('node-waves')
var {PureRenderMixin} = React.addons
var GameActions = require('../../js/actions/game')
var GamesActions = require('../../js/actions/games')
var render = require('./games__game.jsx')

module.exports = React.createClass({
  mixins: [
    PureRenderMixin
  ],

  componentDidMount() {
    Waves.attach(this.getDOMNode())
  },

  onPlay() {
    let gameId = this.props.game.get('id')
    track('Clicks', 'Games - Load Game')
    GamesActions.clearNotifications(gameId)
    GameActions.get(gameId)
  },

  render() {
    return render.call(this)
  }
})