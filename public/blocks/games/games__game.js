var React = require('react')
var GameActions = require('../../js/actions/game')
var render = require('./games__game.jsx')

module.exports = React.createClass({
  onPlay() {
    GameActions.getGame(this.props.game.get('id'))
  },

  render() {
    return render.call(this)
  }
})