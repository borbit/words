var React = require('react')
var Avatar = require('../avatar/avatar')
var moment = require('moment')
var cn = require('classnames')
var _ = require('lodash')

module.exports = function() {
  let {me, logs, game} = this.state
  let items = []
  let users = {}

  if (game.get('id')) {
    for (let i = 1, user; i <= game.get('users_count'); i++) {
      user = game.get(`user${i}`)
      users[user.get('fb_id')] = {
        name: user.get('fb_name')
      , gender: user.get('gender')
      }
    }

    logs.get('list').forEach((log) => {
      let text = log.get('log').split('|')
      let [action, userFBId] = text
      let isMe = me.get('fb_id') == userFBId
      let user = users[userFBId]
      let message = ''

      if (!user) {
        return
      }

      switch (action) {
        case 'PLAY':
          let words = _.map(text[2].split(','), (word) => {
            return `<a href="http://sum.in.ua/?swrd=${word}">${word}</a>`
          })
          message += ` ${user.gender == "male" ? "склав" : "склала"}  ${words.join(', ')},`
          message += ` ${user.gender == "male" ? "отримав" : "отримала"} ${text[3]} очок`
          break
        case 'SWAP':
          message += ` ${user.gender == "male" ? "помiняв" : "помiняла"} лiтери`
          message += ` та ${user.gender == "male" ? "пропустив" : "пропустила"} хiд`
          break
        case 'PASS':
          message += ` ${user.gender == "male" ? "пропустив" : "пропустила"} хiд`
          break
        case 'START':
          message += ` ${user.gender == "male" ? "почав" : "почала"} гру`
          break
        case 'RESIGN':
          message += ` ${user.gender == "male" ? "закiнчів" : "закiнчила"} гру`
          break
        case 'FINISH':
          message += `Гейм овер! Я ${user.gender == "male" ? "виграв" : "виграла"}!`
          break
        case 'DONE':
          message += 'Ой, всьо!'
          break
      }

      let className = cn({
        'stream__item': true
      , 'stream__item_me': isMe
      })

      items.push(
        <div className={className}>
          <div className="stream__balloon">
            <div className="stream__avatar">
              <Avatar facebookId={userFBId} width="20" height="20"/>
            </div>
            <div className="stream__message">
              <p className="stream__message-text" dangerouslySetInnerHTML={{__html: message}}/>
              <i className="stream__message-date">{moment(+log.get('date')).fromNow()}</i>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="stream">
      <div className="stream__line">
        <div className="stream__items">
          {items}
        </div>
      </div>
    </div>
  )
}