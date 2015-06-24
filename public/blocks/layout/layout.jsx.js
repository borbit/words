var React = require('react')
var Alert = require('../alert/alert')
var Board = require('../board/board')
var Boards = require('../boards/boards')
var Aside = require('../aside/aside')
var Menu = require('../menu/menu')
var New = require('../new/new')
var cn = require('classnames')

module.exports = function() {
  let error = this.state.game.get('error')
  let className = cn({
    'layout': true
  , 'layout_aside': this.state.asideClosable && this.state.menuClosed
  , 'layout_menu': this.state.asideClosable && this.state.asideClosed
  })

  return (
    <div className={className}>
      <div className="layout__page" ref="page">
        <div className="layout__menu" style={{width: this.state.asideWidth}}>
          <Menu onClose={this.onMenuClose} closable={this.state.asideClosable}/>
        </div>
        <div className="layout__board" style={{width: this.state.boardWidth}} ref="board">
          <Board/>
        </div>
        <div className="layout__aside" style={{width: this.state.asideWidth}}>
          <Aside onClose={this.onAsideClose} closable={this.state.asideClosable}/>
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