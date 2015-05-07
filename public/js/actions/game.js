var Reflux = require('reflux')
var GamesActions = require('./games')
var $ = require('jquery')

var Actions = module.exports = Reflux.createActions({
  'play': {asyncResult: true}
, 'pass': {asyncResult: true}
, 'resign': {asyncResult: true}
, 'resetError': {}
});

Actions.play.listen(function(gameId, letters) {
  let promise = $.ajax({
    url: `/games/${gameId}/play`
  , data: JSON.stringify({letters: letters})
  , contentType: 'application/json'
  , type: 'POST'
  })
  promise.done(this.completed)
  promise.fail(this.failed)
})

Actions.pass.listen(function(gameId) {
  let promise = $.get(`/games/${gameId}/pass`)
  promise.done(this.completed)
  promise.fail(this.failed)
})

Actions.resign.listen(function(gameId) {
  let promise = $.get(`/games/${gameId}/resign`)
  promise.done(this.completed)
  promise.fail(this.failed)
})

Actions.play.completed.listen(function() {
  GamesActions.getGames()
})

Actions.pass.completed.listen(function() {
  GamesActions.getGames()
})

Actions.resign.completed.listen(function() {
  GamesActions.getGames()
})