var Reflux = require('reflux')
var StoreMixin = require('../mixins/store')
var GamesActions = require('../actions/games')
var GameActions = require('../../js/actions/game')
var Immutable = require('immutable')
var _ = require('lodash')

module.exports = Reflux.createStore({
  mixins: [StoreMixin],

  init() {
    this.listenToMany(GamesActions);
  },

  getGameIndex(gameId) {
    return this.state.findIndex((game) => {
      return game.get('id') == gameId
    })
  },

  onReceiveUpdates(updates) {
    let data = _.omit(updates, 'logs', 'chat')
    let index = this.getGameIndex(updates.id)
    let game = this.state.get(index)

    game = game.withMutations((game) => {
      _.each(data, (value, key) => {
        game.set(key, value)
      })
    })

    this.state = this.state.set(index, game)
    this.trigger(this.state)
  },

  onReceiveNew(data) {
    this.state = this.state.push(Immutable.fromJS(data))
    this.trigger(this.state)
  },

  onIncrNotifications(gameId) {
    let index = this.getGameIndex(gameId)
    let game = this.state.get(index)
    game = game.set('notif', (game.get('notif') || 0) + 1)
    this.state = this.state.set(index, game)
    this.trigger(this.state)
  },

  onClearNotifications(gameId) {
    let index = this.getGameIndex(gameId)
    let game = this.state.get(index).set('notif', 0)
    this.state = this.state.set(index, game)
    this.trigger(this.state)
  }
})