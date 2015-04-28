var Immutable = require('immutable')

module.exports = {
  setState(data) {
    this.state = Immutable.fromJS(data)
    this.trigger(this.state)
  },

  getState() {
    return this.state
  }
}