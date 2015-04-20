var Reflux = require('reflux')
var Immutable = require('immutable')

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