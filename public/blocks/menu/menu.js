var React = require('react')
var Reflux = require('reflux')
var BoardsActions = require('../../js/actions/boards')
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
    this.setState({boardsOpen: true})
    LayoutActions.boardsOpen()
    BoardsActions.getBoards()
  },

  onNewClick() {
    LayoutActions.newOpen()
  },

  render() {
    return render.call(this)
  }
})