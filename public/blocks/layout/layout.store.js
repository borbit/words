var Reflux = require('reflux')
var StoreMixin = require('../../js/mixins/store')
var GameActions = require('../../js/actions/game')
var LayoutActions = require('./layout.actions')
var Immutable = require('immutable')

module.exports = Reflux.createStore({
  mixins: [StoreMixin],

  init() {
    this.state = Immutable.Map({
      boardsOpen: false
    , newOpen: false
    })

    this.listenToMany(LayoutActions)
    this.listenTo(GameActions.add.completed, this.onNewClose)
  },

  onBoardsOpen() {
    this.state = this.state.set('boardsOpen', true)
    this.trigger(this.state)
  },

  onBoardsClose() {
    this.state = this.state.set('boardsOpen', false)
    this.trigger(this.state)
  },

  onNewOpen() {
    this.state = this.state.set('newOpen', true)
    this.trigger(this.state)
  },

  onNewClose() {
    this.state = this.state.set('newOpen', false)
    this.trigger(this.state)
  }
})