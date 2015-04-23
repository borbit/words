var Reflux = require('reflux')
var StoreMixin = require('../mixins/store')
var GameActions = require('../actions/game')

module.exports = Reflux.createStore({
  mixins: [StoreMixin],
  
  init() {
    this.listenTo(GameActions.getGame.completed, this.setState)
  }
})