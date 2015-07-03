var React = require('react')
var BoardBody = require('./board__body')

module.exports = function() {
  return (
    <div className="board">
      <div className="board__panel">
        <BoardBody/>
      </div>
    </div>
  )
}