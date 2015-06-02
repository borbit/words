var React = require('react')
var Reflux = require('reflux')
var BoardsStore = require('../../js/stores/boards')
var MeStore = require('../../js/stores/me')
var render = require('./boards.jsx')

module.exports = React.createClass({
  mixins: [
    Reflux.connect(BoardsStore, 'boards')
  , Reflux.connect(MeStore, 'me')
  ],

  getInitialState() {
    return {
      boards: BoardsStore.getState()
    , me: MeStore.getState()
    }
  },

  render() {
    return render.call(this)
  }
})