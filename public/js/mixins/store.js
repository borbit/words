var Immutable = require('immutable')

module.exports = {
  setState(data) {
    if (data) {
      this.state = Immutable.fromJS(data)
      this.trigger(this.state)
    }
  },

  onResetError() {
    this.state = this.state.delete('error')
    this.trigger(this.state)
  },

  getState() {
    return this.state
  }
}