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
    this.setState({loading: true, list: []})
  },

  onGetCompleted(list) {
    this.setState({loading: false, list: list})
  }
})