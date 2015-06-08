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
    info.push(
      <tr className={className}>
        <td><User user={this.props.game.get(`user${i}`)} width={20} height={20}/></td>
        <td><div className="games__ellipsis">{this.props.game.get(`user${i}`).get('fb_name')}</div></td>
        <td><div className="games__ellipsis">{this.props.game.get(`user${i}_score`)}</div></td>
      </tr>
    )
  }

  info = _.sortBy(info, (row, i) => {
    return -this.props.game.get(`user${i+1}_score`)
  })

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