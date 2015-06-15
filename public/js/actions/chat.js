var Reflux = require('reflux')
var $ = require('jquery')

var Actions = module.exports = Reflux.createActions({
  'send': {asyncResult: true}
})

Actions.send.listen(function(gameId, message) {
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