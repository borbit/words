var React = require('react')
var Reflux = require('reflux')
var Immutable = require('immutable')
var MeStore = require('../../js/stores/me')
var UsersStore = require('../../js/stores/users')
var FriendsStore = require('../../js/stores/friends')
var GameActions = require('../../js/actions/game')
var render = require('./new.jsx')

module.exports = React.createClass({
  mixins: [
    Reflux.connect(FriendsStore, 'friends')
  , Reflux.connect(UsersStore, 'users')
  ],

  getInitialState() {
    return {
      me: MeStore.getState()
    , users: UsersStore.getState()
    , friends: FriendsStore.getState()
    , checked: Immutable.Set()
    }
  },

  onToggle(userFBId) {
    if (this.state.checked.includes(userFBId)) {
      this.setState({
        checked: this.state.checked.remove(userFBId)
      })
    } else {
      this.setState({
        checked: this.state.checked.add(userFBId)
      })
    }
  },

  onCreate() {
    GameActions.add(this.state.checked)
  },

  render() {
    return render.call(this)
  }
})