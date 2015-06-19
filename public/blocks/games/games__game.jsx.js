var React = require('react')
var User = require('../user/user')
var moment = require('moment')
var cn = require('classnames')
var _ = require('lodash')

if (typeof window != 'undefined') {
  var Preview = require('../preview/preview')
}

module.exports = function() {
  let users = []
  let info = []

  for (let i = 1; i <= this.props.game.get('users_count'); i++) {
    let className = cn({
      'games__info-row': true
    , 'games__info-row_cur': this.props.game.get('current_turn') == i
    })

    let user = this.props.game.get(`user${i}`)
    let userRank = user.get('ranks').get('score')

    info.push(
      <tr className={className}>
        <td><User user={user} width={20} height={20}/></td>
        <td><div className="games__ellipsis">{userRank >= 0 && userRank <= 2 &&
          <i className={`fa fa-trophy games__medal games__medal_${userRank}`}></i>} {user.get('fb_name')}</div></td>
        <td><div className="games__ellipsis">{this.props.game.get(`user${i}_score`)}</div></td>
      </tr>
    )
  }

  info = _.sortBy(info, (row, i) => {
    return -this.props.game.get(`user${i+1}_score`)
  })

  let notif = this.props.game.get('notif') || 0
  let finishedAt = this.props.game.get('finished_at')
  let winner = this.props.game.get('winner')

  if (finishedAt && winner >= 0) {
    let user = this.props.game.get(`user${winner}`)

    info.push(
      <tr>
        <td></td>
        <td><div className="games__ellipsis">{user.get('gender') == 'male' ? 'Перемiг' : 'Перемогла'}</div></td>
        <td><div className="games__ellipsis">{user.get('fb_name')}</div></td>
      </tr>
    )
    info.push(
      <tr>
        <td></td>
        <td><div className="games__ellipsis">Закiнчили</div></td>
        <td><div className="games__ellipsis">{moment(+finishedAt).fromNow()}</div></td>
      </tr>
    )
  } else {
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
        <td><div className="games__ellipsis">{this.props.game.get('letters').length}</div></td>
      </tr>
    )
  }

  let className = cn({
    'games__game list-group-item': true
  , 'games__game_cur': this.props.current
  })

  return (
    <div className={className} onClick={this.onPlay}>
      {this.props.loading &&
        <i className="games__spin fa fa-spin fa-circle-o-notch"></i>}
      <div className="games__preview">
        {!!notif &&
          <span className="games__notif">{notif}</span>}
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