var React = require('react')
var Avatar = require('../avatar/avatar')
var cn = require('classnames')

module.exports = function() {
  let items = []
  let users = {}

  let me = this.state.me
  let opponent = this.state.game.get('opponent')
  
  if (opponent) {
    users[me.get('fb_id')] = {
      name: me.get('fb_name')
    , gender: me.get('gender')
    }
    users[opponent.get('fb_id')] = {
      name: opponent.get('fb_name')
    , gender: opponent.get('gender')
    }
  }

  this.state.logs.forEach((log) => {
    log = log.get('log').split('|')

    let [action, userFBId] = log
    let user = users[userFBId]
    let message = ''

    let isMe = me.get('fb_id') == userFBId

    if (action == 'PLAY') {
      message += ` ${user.gender == "male" ? "виклав" : "виклала"}  ${log[2].split(',').join(', ')}, ${user.gender == "male" ? "отримав" : "отримала"} ${log[3]} очок`
    }
    if (action == 'SWAP') {
      message += ` ${user.gender == "male" ? "помiняв" : "помiняла"} лiтери та ${user.gender == "male" ? "пропустив" : "пропустила"} хiд`
    }
    if (action == 'PASS') {
      message += ` ${user.gender == "male" ? "пропустив" : "пропустила"} хiд`
    }
    if (action == 'START') {
      message += ` ${user.gender == "male" ? "почав" : "почала"} гру`
    }

    let className = cn({
      'stream__item': true
    , 'stream__item_me': isMe
    })

    items.push(
      <div className={className}>
        <div className="stream__balloon">
          {!isMe &&
            <div className="stream__avatar">
              <Avatar facebookId={userFBId} width="20" height="20"/>
            </div>}
          {message}
        </div>
      </div>
    )
  })

  return (
    <div className="stream">
      {items}
    </div>
  )
}