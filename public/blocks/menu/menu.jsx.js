var React = require('react')
var Games = require('../games/games')

module.exports = function() {
  let rank = this.state.me.get('ranks').get('score')

  return (
    <div className="menu">
      <div className="menu__btns btn-group">
        <button className="btn btn-sm btn-default">
          <i className="fa fa-comment"></i>
        </button>
      </div>
      <div className="menu__btns btn-group">
        <button className="btn btn-sm btn-default">
          <i className="fa fa-info-circle"></i>
        </button>
        <button className="btn btn-sm btn-default" onClick={this.onBoardsClick}>
          <i className="fa fa-trophy"></i> {rank >= 0 && <span>{rank+1}</span>}
        </button>
        <button className="btn btn-sm btn-default" onClick={this.onNewClick}>
          <i className="fa fa-plus-circle"></i>
        </button>
      </div>
      <Games/>
    </div>
  )
}