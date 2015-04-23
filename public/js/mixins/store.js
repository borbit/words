var Immutable = require('immutable')

module.exports = {
  setState(data) {
    this.state = Immutable.fromJS(data)
  },

  getState() {
    return this.state
  }
}