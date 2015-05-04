var React = require('react')
var User = require('../user/user')

module.exports = function() {
  return (
    <div className="panel-heading board__head">
      {this.state.game.get('id') &&
        <div className="board__player">
          <User user={this.state.me} theme="right">
            {this.state.game.get('my_score')}
          </User>
        </div>}
      {this.state.game.get('id') &&
        <div className="board__player">
          <User user={this.state.game.get('opponent')}>
            {this.state.game.get('opponent_score')}
          </User>
        </div>}
    </div>
  )
}