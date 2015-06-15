var Reflux = require('reflux')
var GamesActions = require('./games')
var $ = require('jquery')

var Actions = module.exports = Reflux.createActions({
  'get': {asyncResult: true}
, 'add': {asyncResult: true}
, 'play': {asyncResult: true}
, 'swap': {asyncResult: true}
, 'pass': {asyncResult: true}
, 'done': {asyncResult: true}
, 'resign': {asyncResult: true}
, 'message': {asyncResult: true}
, 'receiveUpdates': {}
, 'resetError': {}
})

Actions.get.listen(function(gameId) {
  var promise = $.get(`/games/${gameId}`)
  promise.done(this.completed)
  promise.fail(this.failed)
})

Actions.add.listen(function(opponentFBIds) {
  let data = {opponentFBIds: opponentFBIds.toArray()}
  let promise = $.ajax({
    url: '/games'
  , data: JSON.stringify(data)
  , contentType: 'application/json'
  , type: 'POST'
  })
  promise.done(this.completed)
  promise.fail(this.failed)
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

Actions.swap.listen(function(gameId, letters) {
  let promise = $.ajax({
    url: `/games/${gameId}/swap`
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

Actions.done.listen(function(gameId) {
  let promise = $.get(`/games/${gameId}/done`)
  promise.done(this.completed)
  promise.fail(this.failed)
})

Actions.play.completed.listen(function(data) {
  GamesActions.receiveUpdates(data)
})
Actions.swap.completed.listen(function(data) {
  GamesActions.receiveUpdates(data)
})
Actions.pass.completed.listen(function(data) {
  GamesActions.receiveUpdates(data)
})
Actions.resign.completed.listen(function(data) {
  GamesActions.receiveUpdates(data)
})
Actions.add.completed.listen(function(data) {
  GamesActions.receiveNew(data)
})

Actions.message.listen(function(gameId, message) {
  let data = {message: message}
  let promise = $.ajax({
    url: `/games/${gameId}/chat`
  , data: JSON.stringify(data)
  , contentType: 'application/json'
  , type: 'POST'
  })
  promise.done(this.completed)
  promise.fail(this.failed)
})