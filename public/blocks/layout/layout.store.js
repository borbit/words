var Reflux = require('reflux')

module.exports = Reflux.createStore({
  init() {
    this.page = 'menu'
  },

  getState() {
    return {
      page: this.page
    }
  }
})