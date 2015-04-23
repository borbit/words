var Reflux = require('reflux')
var StoreMixin = require('../../js/mixins/store')

module.exports = Reflux.createStore({
  mixins: [StoreMixin]
})