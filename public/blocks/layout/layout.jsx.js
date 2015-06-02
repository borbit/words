var React = require('react')
var Alert = require('../alert/alert')
var Board = require('../board/board')
var Boards = require('../boards/boards')
var Aside = require('../aside/aside')
var Menu = require('../menu/menu')
var New = require('../new/new')

module.exports = function() {
  let error = this.state.game.get('error')

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
      {error &&
        <Alert title="Помилка" onClose={this.onResetError}>{error}</Alert>}
      {!error && this.state.layout.get('boardsOpen') &&
        <Boards onClose={this.onBoardsClose}/>} 
      {!error && this.state.layout.get('newOpen') &&
        <New onClose={this.onNewClose}/>} 
    </div>
  )
}