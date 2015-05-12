const React = require('react')
const Reflux = require('reflux')
const LayoutStore = require('./layout.store')
const render = require('./layout.jsx')

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
    let $board = $(this.refs.board.getDOMNode())
    let $aside = $(this.refs.aside.getDOMNode())
    let $menu = $(this.refs.menu.getDOMNode())
    
    let windowWidth = $(window).width()
    let boardWidth = $board.height() - 120
    let asideWidth

    if (windowWidth > 1200) {
      asideWidth = (windowWidth - boardWidth) / 2 - 20
    } else {
      asideWidth = windowWidth - boardWidth - 30
    }

    $board.width(boardWidth)
    $aside.width(asideWidth)
    $menu.width(asideWidth)
  },

  render() {
    return render.call(this)
  }
})