var React = require('react')
var Reflux = require('reflux')
var BoardsActions = require('./boards.actions')
var BoardsStore = require('./boards.store')
var MeStore = require('../../js/stores/me')
var render = require('./boards.jsx')
var _ = require('lodash')

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

  onTab(type, board) {
    track('Clicks', `Boards - Open ${_.capitalize(type)} ${_.capitalize(board)}`)
    BoardsActions.getBoard(type, board)
  },

  render() {
    return render.call(this)
  }
})