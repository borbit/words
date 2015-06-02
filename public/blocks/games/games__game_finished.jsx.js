var React = require('react')
var User = require('../user/user')
var moment = require('moment')

if (typeof window != 'undefined') {
  var Preview = require('../preview/preview')
}

module.exports = function() {
  let users = []
  let info = []

  for (let i = 1; i <= this.props.game.get('users_count'); i++) {
    users.push(
      <div className="games__user">
        <User user={this.props.game.get(`user${i}`)}/>
      </div>
    )
    info.push(
      <tr>
        <td>{this.props.game.get(`user${i}`).get('fb_name')}</td>
        <td>{this.props.game.get(`user${i}_score`)}</td>
      </tr>
    )
  }

  info.push(
    <tr>
      <td>Зкiнчили</td>
      <td>{moment(+this.props.game.get('finished_at')).fromNow()}</td>
    </tr>
  )
  info.push(
    <tr>
      <td>Залишилось лiтер</td>
      <td>{this.props.game.get('letters_count')}</td>
    </tr>
  )

  return (
    <div className="games__game list-group-item" onClick={this.onPlay}>
      <i className="games__delete fa fa-times"></i>
      <div className="games__preview">
        {typeof window != 'undefined' &&
          <Preview field={this.props.game.get('field')}/>}
      </div>
      <div className="games__users">
        {users}
      </div>
      <table className="games__info">
        {info}
      </table>
    </div>
  )
}