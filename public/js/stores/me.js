var Reflux = require('reflux')
var StoreMixin = require('../mixins/store')

module.exports = Reflux.createStore({
  mixins: [StoreMixin]
})