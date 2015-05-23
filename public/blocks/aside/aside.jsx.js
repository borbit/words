var React = require('react')
var Stream = require('../stream/stream')

module.exports = function() {
  return (
    <div className="aside">
      <div className="aside__stream">
        <Stream/>
      </div>
    </div>
  )
}