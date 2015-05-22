var React = require('react')
var GameActions = require('../../js/actions/game')
var render = require('./friends__friend.jsx')

module.exports = React.createClass({
  getInitialState() {
    return {
      confirmCreate: false
    }
  },

  onCreate() {
    this.setState({confirmCreate: true})
  },

  onCreateCancel() {
    this.setState({confirmCreate: false})
  },

  onCreateConfirm() {
    GameActions.add(this.props.friend.get('fb_id'))
    this.onCreateCancel()
  },

  render() {
    return render.call(this)
  }
})