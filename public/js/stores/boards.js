var Reflux = require('reflux')
var Immutable = require('immutable')
var StoreMixin = require('../mixins/store')
var BoardsActions = require('../actions/boards')

module.exports = Reflux.createStore({
  mixins: [StoreMixin],

  init() {
    this.state = Immutable.List()
    this.listenToMany(BoardsActions);
  },

  onGetBoardsCompleted(data) {
    this.setState(data)
  }
})