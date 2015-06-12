var React = require('react')
var Reflux = require('reflux')
var {PureRenderMixin} = React.addons
var GameStore = require('../../js/stores/game')
var LogsStore = require('../../js/stores/logs')
var MeStore = require('../../js/stores/me')
var render = require('./stream.jsx')
var $ = require('jquery')

module.exports = React.createClass({
  mixins: [
    Reflux.connect(GameStore, 'game')
  , Reflux.connect(LogsStore, 'logs')
  , Reflux.connect(MeStore, 'me')
  , PureRenderMixin
  ],

  getInitialState() {
    return {
      game: GameStore.getState()
    , logs: LogsStore.getState()
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
    let $el = $(this.getDOMNode())
    let $line = $el.find('.stream__line')
    let lineHeight = $line.height()
    let elHeight = $el.height()

    if (lineHeight > elHeight) {
      $el.scrollTop(lineHeight - elHeight)
    }
  },

  render() {
    return render.call(this)
  }
})