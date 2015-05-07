var React = require('react')
var User = require('../user/user')

module.exports = function() {
  return (
    <div className="panel-heading board__head">
      {this.state.game.get('id') &&
        <div className="board__player">
          <User user={this.state.me} theme="right">
            <span className="badge">
              <i className="fa fa-star"></i> {this.state.game.get('my_score')}
            </span>
          </User>
        </div>}
      {this.state.game.get('id') &&
        <div className="board__player">
          <User user={this.state.game.get('opponent')}>
            <span className="badge">
              <i className="fa fa-star"></i> {this.state.game.get('opponent_score')}
            </span>
          </User>
        </div>}
    </div>
  )
}