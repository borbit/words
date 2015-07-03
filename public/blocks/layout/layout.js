var React = require('react')
var Reflux = require('reflux')
var GameStore = require('../../js/stores/game')
var GameActions = require('../../js/actions/game')
var LayoutStore = require('./layout.store')
var LayoutActions = require('./layout.actions')
var render = require('./layout.jsx')
var _ = require('lodash')

module.exports = React.createClass({
  mixins: [
    Reflux.connect(GameStore, 'game')
  , Reflux.connect(LayoutStore, 'layout')
  ],

  getInitialState() {
    return {
      game: GameStore.getState()
    , layout: LayoutStore.getState()
    , boardWidth: null
    , asideWidth: null
    , asideClosable: false
    , asideClosed: false
    , menuClosed: false
    }
  },

  componentDidMount() {
    this.$board = $(this.refs.board.getDOMNode())
    this.$page = $(this.refs.page.getDOMNode())

    this.arrangeLayout()
    this._arrangeLayout = _.debounce(() => {
      this.arrangeLayout()
    }, 250)

    $(window).on('resize', this._arrangeLayout)
  },

  componentWillUnmount() {
    $(window).off('resize', this._arrangeLayout)
  },

  arrangeLayout() {
    let pageWidth = this.$page.outerWidth()
    let boardWidth = this.$board.outerHeight() - 114
    
    let asideWidth = (pageWidth - boardWidth) / 2 - 12
    let asideClosable = false

    if (pageWidth < 1200) {
      asideWidth = pageWidth - boardWidth - 30
      asideClosable = true
    }

    this.setState({
      asideClosable: asideClosable
    , boardWidth: boardWidth
    , asideWidth: asideWidth
    })
  },

  onResetError() {
    if (this.state.game.get('error')) {
      GameActions.resetError()
    } else if (this.state.games.get('error')) {
      GamesActions.resetError()
    }
  },

  onMenuClose() {
    track('Clicks', 'Layout - Aside Open')
    this.setState({
      asideClosed: false
    , menuClosed: true
    })
  },

  onAsideClose() {
    track('Clicks', 'Layout - Menu Open')
    this.setState({
      asideClosed: true
    , menuClosed: false
    })
  },

  onBoardsClose() {
    LayoutActions.boardsClose()
  },

  onNewClose() {
    LayoutActions.newClose()
  },

  render() {
    return render.call(this)
  }
})