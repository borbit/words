var React = require('react')
var BoardHead = require('./board__head')
var BoardBody = require('./board__body')

module.exports = function() {
  return (
    <div className="board">
      <div className="board__panel panel panel-default">
        <BoardHead/>
        <BoardBody/>
      </div>
    </div>
  )
}