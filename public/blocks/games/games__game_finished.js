var React = require('react')
var GamesActions = require('../../js/actions/games')
var render = require('./games__game_finished.jsx')

module.exports = React.createClass({
  onPlay() {
    GamesActions.getGame(this.props.game.get('id'))
  },

  render() {
    return render.call(this)
  }
})