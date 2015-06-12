var Reflux = require('reflux')
var Immutable = require('immutable')
var StoreMixin = require('../mixins/store')
var LogsActions = require('../actions/logs')
var Immutable = require('immutable')

module.exports = Reflux.createStore({
  mixins: [StoreMixin],
  
  init() {
    this.state = Immutable.Map()
    this.listenToMany(LogsActions);
  },

  onGet() {
    this.state = this.state.set('loading', true)
    this.trigger(this.state)
  },

  onGetCompleted(list) {
    this.state = this.state.set('loading', false)
    this.state = this.state.set('list', Immutable.fromJS(list))
    this.trigger(this.state)
  }
})