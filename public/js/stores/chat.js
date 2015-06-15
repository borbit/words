var Reflux = require('reflux')
var Immutable = require('immutable')
var StoreMixin = require('../mixins/store')
var ChatActions = require('../actions/chat')
var Immutable = require('immutable')

module.exports = Reflux.createStore({
  mixins: [StoreMixin],
  
  init() {
    //this.state = Immutable.Map()
    // this.listenToMany(LogsActions);
  }
})