var Reflux = require('reflux')
var StoreMixin = require('../mixins/store')
var GamesActions = require('../actions/games')
var Immutable = require('immutable')
var _ = require('lodash')

module.exports = Reflux.createStore({
  mixins: [StoreMixin],

  init() {
    this.listenToMany(GamesActions);
  },

  onReceiveUpdates(updates) {
    let index = this.state.findIndex((game) => {
      return game.get('id') == updates.id
    })

    let game = this.state.get(index)
    let data = _.omit(updates, 'logs', 'chat')

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
  }
})