var Reflux = require('reflux')
var $ = require('jquery')

var Actions = module.exports = Reflux.createActions({
  'get': {asyncResult: true}
})

Actions.get.listen(function(gameId) {
  var promise = $.get(`/games/${gameId}/logs`)
  promise.done(this.completed)
  promise.fail(this.failed)
})