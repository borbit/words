var React = require('react')
var Reflux = require('reflux')
var BoardsActions = require('../boards/boards.actions')
var LayoutActions = require('../layout/layout.actions')
var MeStore = require('../../js/stores/me')
var render = require('./menu.jsx')
var $ = require('jquery')

module.exports = React.createClass({
  mixins: [
    Reflux.connect(MeStore, 'me')
  ],

  getInitialState() {
    return {
      me: MeStore.getState()
    }
  },

  componentDidUpdate() {
    $(this.getDOMNode()).find('.menu__btns .btn').tooltip({
      delay: {show: 300, hide: 100}
    , container: 'body'
    , placement: 'auto'
    })
  },

  onBoardsClick() {
    track('Clicks', 'Menu - Boards Open')
    this.setState({boardsOpen: true})
    BoardsActions.getBoard('daily', 'score')
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