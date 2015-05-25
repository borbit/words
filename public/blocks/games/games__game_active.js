var React = require('react')
var GameActions = require('../../js/actions/game')
var LogsActions = require('../../js/actions/logs')
var render = require('./games__game_active.jsx')

module.exports = React.createClass({
  onPlay() {
    GameActions.get(this.props.game.get('id'))
    LogsActions.get(this.props.game.get('id'))
  },

  render() {
    return render.call(this)
  }
})