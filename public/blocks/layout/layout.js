var React = require('react')
var Reflux = require('reflux')
var GameStore = require('../../js/stores/game')
var GameActions = require('../../js/actions/game')
var LayoutStore = require('./layout.store')
var render = require('./layout.jsx')
var _ = require('lodash')

module.exports = React.createClass({
  mixins: [
    Reflux.connect(GameStore, 'game')
  ],

  getInitialState() {
    return {
      game: GameStore.getState()
    }
  },

  componentDidMount() {
    this.$board = $(this.refs.board.getDOMNode())
    this.$aside = $(this.refs.aside.getDOMNode())
    this.$menu = $(this.refs.menu.getDOMNode())
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
    let boardWidth = this.$board.outerHeight() - 62
    let asideWidth

    if (pageWidth > 1200) {
      asideWidth = (pageWidth - boardWidth) / 2 - 20
    } else {
      asideWidth = pageWidth - boardWidth - 30
    }

    this.$board.width(boardWidth)
    this.$aside.width(asideWidth)
    this.$menu.width(asideWidth)
  },

  onResetError() {
    if (this.state.game.get('error')) {
      GameActions.resetError()
    } else if (this.state.games.get('error')) {
      GamesActions.resetError()
    }
  },

  render() {
    return render.call(this)
  }
})