var Reflux = require('reflux')
var $ = require('jquery')

var Actions = module.exports = Reflux.createActions({
  'getBoard': {asyncResult: true}
});

Actions.getBoard.listen(function(type, board) {
  var promise = $.get(`/boards/${type}/${board}`)
  promise.fail(this.failed)
  promise.done((list) => {
    this.completed({type: type, name: board, list: list})
  })
})