var Reflux = require('reflux')
var StoreMixin = require('../mixins/store')
var GamesActions = require('../actions/games')

module.exports = Reflux.createStore({
  mixins: [StoreMixin],

  init() {
    this.listenToMany(GamesActions);
  },

  onGetGamesCompleted(data) {
    this.setState(data)
  }
})