var Reflux = require('reflux')
var Immutable = require('immutable')
var _ = require('lodash')

module.exports = Reflux.createStore({
  init() {
    this.state = Immutable.Map()
  },

  setState(data) {
    this.state = this.state.withMutations((state) => {
      _.each(data, (value, key) => {
        state.set(key, value)
      })
    })
  },

  getState() {
    return this.state
  }
})