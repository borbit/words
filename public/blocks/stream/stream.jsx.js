var React = require('react')

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
    let message = user.name.split(' ')[0]

    if (action == 'PLAY') {
      message += ` ${user.gender == "male" ? "зробив" : "зробила"} хiд ${log[2]}, та ${user.gender == "male" ? "отримав" : "отримала"} ${log[3]} очок`
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

    items.push(
      <div className="stream__item list-group-item">
        {message}
      </div>
    )
  })

  return (
    <div className="stream list-group">
      {items}
    </div>
  )
}