var React = require('react')
var Field = require('../field/field')
var Letters = require('../letters/letters')
var User = require('../user/user')

module.exports = function() {
  return (
    <div className="board" key={this.state.game && this.state.game.get('id')}>
      <div className="panel panel-default">
        <div className="panel-heading board__head">
          {this.state.game &&
            <div className="board__player">
              <User user={this.state.me} theme="right">
                {this.state.game.get('my_score')}
              </User>
            </div>}
          {this.state.game &&
            <div className="board__player">
              <User user={this.state.game.get('opponent')}>
                {this.state.game.get('opponent_score')}
              </User>
            </div>}
        </div>
        <div className="panel-body board__body">
          <div className="board__field">
            <Field field={this.state.game && this.state.game.get('field')}/>
          </div>
          <div className="board__letters">
            <Letters letters={this.state.game && this.state.game.get('my_letters')}/>
          </div>
        </div>
      </div>
    </div>
  )
}