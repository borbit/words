var Reflux = require('reflux')
var Immutable = require('immutable')
var StoreMixin = require('../mixins/store')
var LogsActions = require('../actions/logs')
var Immutable = require('immutable')

module.exports = Reflux.createStore({
  mixins: [StoreMixin],
  
  init() {
    this.state = Immutable.List()
    this.listenToMany(LogsActions);
  },

  onGetCompleted(data) {
    this.setState(data)
  }
})