var React = require('react')
var {PureRenderMixin} = React.addons
var GameActions = require('../../js/actions/game')
var render = require('./games__game.jsx')

module.exports = React.createClass({
  mixins: [
    PureRenderMixin
  ],

  onPlay() {
    GameActions.get(this.props.game.get('id'))
  },

  render() {
    return render.call(this)
  }
})