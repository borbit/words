var React = require('react')
var Field = require('../field/field')
var Letters = require('../letters/letters')
var User = require('../user/user')

module.exports = function() {
  return (
    <div className="board">
      <div className="panel panel-default">
        <div className="panel-heading board__head">
          <div className="board__player">
            <User user={this.state.me} theme="right"/>
          </div>
          <div className="board__player">
            <User user={this.state.me}/>
          </div>
        </div>
        <div className="panel-body board__body">
          <div className="board__field"><Field/></div>
          <div className="board__letters">
            <Letters/>
          </div>
        </div>
      </div>
    </div>
  )
}