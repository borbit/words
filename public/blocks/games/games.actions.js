var Reflux = require('reflux')
var $ = require('jquery')

var Actions = module.exports = Reflux.createActions({
  'addGame': {asyncResult: true}
});

Actions.addGame.listen((opponentFBId) => {
  var promise = $.post('/games', {opponentFBId: opponentFBId})
  promise.done((res) => {
    console.log('success', res)
  })
  promise.fail((res) => {
    console.log('fail', res)
  })
})