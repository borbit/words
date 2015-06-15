var React = require('react')
var Reflux = require('reflux')
var {PureRenderMixin} = React.addons
var GameActions = require('../../js/actions/game')
var GameStore = require('../../js/stores/game')
var MeStore = require('../../js/stores/me')
var render = require('./stream.jsx')
var _ = require('lodash')
var $ = require('jquery')

module.exports = React.createClass({
  mixins: [
    Reflux.connect(GameStore, 'game')
  , Reflux.connect(MeStore, 'me')
  , PureRenderMixin
  ],

  getInitialState() {
    return {
      game: GameStore.getState()
    , me: MeStore.getState()
    }
  },

  componentDidMount() {
    this.scrollBottom()
    this.refs.input.getDOMNode().focus()
    $(document.body).click(() => {
      this.refs.input.getDOMNode().focus()
    })
  },

  componentDidUpdate() {
    this.scrollBottom()
  },

  scrollBottom() {
    let $line = $(this.refs.line.getDOMNode())
    let $items = $(this.refs.items.getDOMNode())
    let itemsHeight = $items.height()
    let lineHeight = $line.height()

    if (itemsHeight > lineHeight) {
      $line.scrollTop(itemsHeight - lineHeight)
    }
  },

  onKeyDown(e) {
    if (e.keyCode == 13) {
      let value = _.trim(e.target.value)
      if (value.length > 0) {
        GameActions.sendMessage(this.state.game.get('id'), value)
        e.target.value = ''
      }
    }
  },

  render() {
    return render.call(this)
  }
})
