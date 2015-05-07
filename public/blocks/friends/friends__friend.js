var React = require('react')
var GamesActions = require('../../js/actions/games')
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
    GamesActions.addGame(this.props.friend.get('fb_id'))
    this.onCreateCancel()
  },

  render() {
    return render.call(this)
  }
})