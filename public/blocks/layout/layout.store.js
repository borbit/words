var Reflux = require('reflux')
var StoreMixin = require('../../js/mixins/store')
var GameActions = require('../../js/actions/game')
var Immutable = require('immutable')

module.exports = Reflux.createStore({
  mixins: [StoreMixin],

  init() {
    this.state = Immutable.Map({page: 'menu'})
    this.listenTo(GameActions.getGame.completed, this.onGame)
  },

  onGame() {
    this.state = this.state.set('page', 'game')
    this.trigger(this.state)
  }
})