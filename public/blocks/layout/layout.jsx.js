var React = require('react')
var Alert = require('../alert/alert')
var Board = require('../board/board')
var Aside = require('../aside/aside')
var Menu = require('../menu/menu')

const GamesStore = require('../../js/stores/games')

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
      {this.state.game.get('error') &&
        <Alert title="Помилка" onClose={this.onResetError}>
          {this.state.game.get('error')}
        </Alert>}
    </div>
  )
}