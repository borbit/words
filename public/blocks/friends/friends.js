var React = require('react')
var Reflux = require('reflux')
var FriendsStore = require('../../js/stores/friends')
var render = require('./friends.jsx')

module.exports = React.createClass({
  mixins: [
    Reflux.connect(FriendsStore)
  ],

  getInitialState() {
    return {
      friends: FriendsStore.getState()
    }
  },

  render() {
    return render.call(this)
  }
})