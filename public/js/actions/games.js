var Reflux = require('reflux')
var $ = require('jquery')

var Actions = module.exports = Reflux.createActions({
  'getGames': {asyncResult: true}
});

Actions.getGames.listen(function() {
  var promise = $.get(`/games`)
  promise.done(this.completed)
  promise.fail(this.failed)
})