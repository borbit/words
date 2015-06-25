var React = require('react')
var Games = require('../games/games')

module.exports = function() {
  let rankGeneral = this.state.me.get('ranks').get('general').get('score')
  let rankDaily = this.state.me.get('ranks').get('daily').get('score')

  let rank = []
  if (rankDaily >= 0) rank.push(rankDaily+1)
  if (rankGeneral >= 0) rank.push(rankGeneral+1)
  rank = rank.join('/')

  return (
    <div className="menu">
      {this.props.closable &&
        <div className="menu__btns btn-group">
          <button className="btn btn-sm btn-default" onClick={this.props.onClose}>
            <i className="fa fa-comment"></i>
          </button>
        </div>}
      <div className="menu__btns btn-group">
        <button className="btn btn-sm btn-default">
          <i className="fa fa-info-circle"></i>
        </button>
        <button className="btn btn-sm btn-default" onClick={this.onBoardsClick}>
          <i className="fa fa-trophy"></i> {rank && <span>{rank}</span>}
        </button>
        <button className="btn btn-sm btn-default" onClick={this.onNewClick}>
          <i className="fa fa-plus-circle"></i>
        </button>
      </div>
      <Games/>
    </div>
  )
}