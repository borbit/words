var React = require('react')
var Board = require('../board/board')
var Aside = require('../aside/aside')
var Menu = require('../menu/menu')

module.exports = function() {
  return (
    <div className="layout">
      <div className="layout__page" ref="page">
        <div className="layout__menu" ref="menu">
          <Menu/>
        </div>
        <div className="layout__board" ref="board">
          <Board/>
        </div>
        <div className="layout__aside" ref="aside">
          <Aside/>
        </div>
      </div>
    </div>
  )
}