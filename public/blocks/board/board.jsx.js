var React = require('react')
var Field = require('../field/field')
var Letters = require('../letters/letters')

module.exports = function() {
  return (
    <div className="board">
      <div className="board__head"></div>
      <div className="board__tabel"><Field/></div>
      <div className="board__foot">
        <Letters/>
      </div>
    </div>
  )
}