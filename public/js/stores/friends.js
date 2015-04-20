var Reflux = require('reflux')
var Immutable = require('immutable')
var _ = require('lodash')

module.exports = Reflux.createStore({
  init() {
    this.state = Immutable.List()
  },

  setState(data) {
    this.state = Immutable.List(data)
  },

  getState() {
    return this.state
  }
})