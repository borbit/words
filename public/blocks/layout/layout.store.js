var Reflux = require('reflux')
var Immutable = require('immutable')

module.exports = Reflux.createStore({
  init() {
    this.state = Immutable.Map({page: 'menu'})
  },

  getState() {
    return this.state
  }
})