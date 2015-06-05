var React = require('react')
var Reflux = require('reflux')
var FriendsStore = require('../../js/stores/friends')
var GameActions = require('../../js/actions/game')
var render = require('./start.jsx')

module.exports = React.createClass({
  mixins: [
    Reflux.connect(FriendsStore)
  ],

  getInitialState() {
    return {
      friends: FriendsStore.getState()
    }
  },

  onCreate() {
    GameActions.add(this.state.checked)
  },

  render() {
    return render.call(this)
  }
})