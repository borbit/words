var React = require('react')
var Board = require('../board/board')
var Aside = require('../aside/aside')

module.exports = function() {
  return (
    <div className="layout">
      <div className="layout__page">
        <div className="layout__content">
          <Board/>
        </div>
        <div className="layout__aside">
          <Aside/>
        </div>
      </div>
    </div>
  )
}