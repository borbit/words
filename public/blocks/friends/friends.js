var React = require('react')
var Reflux = require('reflux')
var FriendsStore = require('./friends.store')
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