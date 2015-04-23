var React = require('react')
var _ = require('lodash')

module.exports = function() {
  var cells = []

  _.range(0, 15).forEach((x) => {
    _.range(0, 15).forEach((y) => {
      cells.push(
        <div className="field__cell"></div>
      )
    })
  })

  return (
    <div className="field">
      {cells}
    </div>
  )
}