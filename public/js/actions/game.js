var Reflux = require('reflux')
var $ = require('jquery')

var Actions = module.exports = Reflux.createActions({
  'addGame': {asyncResult: true}
, 'getGame': {asyncResult: true}
});

Actions.addGame.listen(function(opponentFBId) {
  var promise = $.post('/games', {
    opponentFBId: opponentFBId
  })
  promise.done(this.completed)
  promise.fail(this.failed)
})

Actions.getGame.listen(function(gameId) {
  var promise = $.get(`/games/${gameId}`)
  promise.done(this.completed)
  promise.fail(this.failed)
})