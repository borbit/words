var React = require('react')
var Reflux = require('reflux')
var BoardsActions = require('../boards/boards.actions')
var LayoutActions = require('../layout/layout.actions')
var MeStore = require('../../js/stores/me')
var render = require('./menu.jsx')

module.exports = React.createClass({
  mixins: [
    Reflux.connect(MeStore, 'me')
  ],

  getInitialState() {
    return {
      me: MeStore.getState()
    }
  },

  onBoardsClick() {
    track('Clicks', 'Menu - Boards Open')
    this.setState({boardsOpen: true})
    BoardsActions.getBoard('score')
    LayoutActions.boardsOpen()
  },

  onNewClick() {
    track('Clicks', 'Menu - New Game')
    LayoutActions.newOpen()
  },

  render() {
    return render.call(this)
  }
})