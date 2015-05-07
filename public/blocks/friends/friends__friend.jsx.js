var React = require('react')
var Avatar = require('../avatar/avatar')
var Confirm = require('../confirm/confirm')
var User = require('../user/user')

module.exports = function() {
  return (
    <div className="friends__friend list-group-item" onClick={this.onCreate}>
      <i className="fa fa-play-circle friends__play"></i>
      <User user={this.props.friend}>
        <span className="badge">
          <i className="fa fa-trophy"></i> 38
        </span>
      </User>
      {this.state.confirmCreate &&
        <Confirm
          onOK={this.onCreateConfirm}
          onCancel={this.onCreateCancel}>
          Ви впевненi що хочете почати гру?
        </Confirm>}
    </div>
  )
}