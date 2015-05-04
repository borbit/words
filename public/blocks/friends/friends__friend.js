var React = require('react')
var GamesActions = require('../../js/actions/games')
var render = require('./friends__friend.jsx')

module.exports = React.createClass({
  onPlay() {
    GamesActions.addGame(this.props.friend.get('fb_id'))
  },

  render() {
    return render.call(this)
  }
})