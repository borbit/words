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
    info.push(
      <tr>
        <td><User user={this.props.game.get(`user${i}`)} width={20} height={20}/></td>
        <td><div className="games__ellipsis">{this.props.game.get(`user${i}`).get('fb_name')}</div></td>
        <td><div className="games__ellipsis">{this.props.game.get(`user${i}_score`)}</div></td>
      </tr>
    )
  }

  info.push(
    <tr>
      <td></td>
      <td><div className="games__ellipsis">Попер. хiд</div></td>
      <td><div className="games__ellipsis">{moment(+this.props.game.get('created_at')).fromNow()}</div></td>
    </tr>
  )
  info.push(
    <tr>
      <td></td>
      <td><div className="games__ellipsis">Залишилось лiтер</div></td>
      <td><div className="games__ellipsis">{this.props.game.get('letters_count')}</div></td>
    </tr>
  )

  return (
    <div className="games__game list-group-item" onClick={this.onPlay}>
      <div className="games__preview">
        {typeof window != 'undefined' &&
          <Preview field={this.props.game.get('field')}/>}
      </div>
      <div className="games__info">
        <table>
          {info}
        </table>
      </div>
    </div>
  )
}