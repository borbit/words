var React = require('react')
var GameActions = require('../../js/actions/game')
var render = require('./friends__friend.jsx')

module.exports = React.createClass({
  onPlay() {
    GameActions.addGame(this.props.friend.get('fb_id'))
  },

  render() {
    return render.call(this)
  }
})