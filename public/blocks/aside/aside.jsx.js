var React = require('react')
var Stream = require('../stream/stream')

module.exports = function() {
  return (
    <div className="aside">
      <h4 className="aside__title">Граблi <span className="badge">v0.0.1</span></h4>
      <div className="aside__stream">
        <Stream/>
      </div>
    </div>
  )
}