var Reflux = require('reflux')
var $ = require('jquery')

var Actions = module.exports = Reflux.createActions({
  'getBoards': {asyncResult: true}
});

Actions.getBoards.listen(function() {
  var promise = $.get('/boards/score')
  promise.done(this.completed)
  promise.fail(this.failed)
})