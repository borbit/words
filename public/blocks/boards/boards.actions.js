var Reflux = require('reflux')
var $ = require('jquery')

var Actions = module.exports = Reflux.createActions({
  'getBoard': {asyncResult: true}
});

Actions.getBoard.listen(function(board) {
  var promise = $.get(`/boards/${board}`)
  promise.fail(this.failed)
  promise.done((list) => {
    this.completed({name: board, list: list})
  })
})