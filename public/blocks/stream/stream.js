var React = require('react')
var Reflux = require('reflux')
var {PureRenderMixin} = React.addons
var ChatActions = require('../../js/actions/chat')
var GameStore = require('../../js/stores/game')
var LogsStore = require('../../js/stores/logs')
var ChatStore = require('../../js/stores/chat')
var MeStore = require('../../js/stores/me')
var render = require('./stream.jsx')
var _ = require('lodash')
var $ = require('jquery')

module.exports = React.createClass({
  mixins: [
    Reflux.connect(GameStore, 'game')
  , Reflux.connect(LogsStore, 'logs')
  , Reflux.connect(ChatStore, 'chat')
  , Reflux.connect(MeStore, 'me')
  , PureRenderMixin
  ],

  getInitialState() {
    return {
      game: GameStore.getState()
    , logs: LogsStore.getState()
    , chat: ChatStore.getState()
    , me: MeStore.getState()
    }
  },

  componentDidMount() {
    this.scrollBottom()
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
        ChatActions.send(this.state.game.get('id'), value)
      }
    }
  },

  render() {
    return render.call(this)
  }
})
