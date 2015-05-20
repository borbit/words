const React = require('react')
const Reflux = require('reflux')
const LayoutStore = require('./layout.store')
const render = require('./layout.jsx')
const _ = require('lodash')

module.exports = React.createClass({
  mixins: [
    Reflux.connect(LayoutStore, 'layout')
  ],

  getInitialState() {
    return {
      layout: LayoutStore.getState()
    }
  },

  componentDidMount() {
    this.$board = $(this.refs.board.getDOMNode())
    // this.$aside = $(this.refs.aside.getDOMNode())
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
    let boardWidth = this.$board.outerHeight() - 100
    let asideWidth

    if (pageWidth > 1200) {
      asideWidth = (pageWidth - boardWidth) / 2 - 20
    } else {
      asideWidth = pageWidth - boardWidth - 30
    }

    this.$board.width(boardWidth)
    // this.$aside.width(asideWidth)
    this.$menu.width(asideWidth)
  },

  render() {
    return render.call(this)
  }
})