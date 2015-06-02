var React = require('react')
var Avatar = require('../avatar/avatar')
var moment = require('moment')
var cn = require('classnames')
var _ = require('lodash')

module.exports = function() {
  let me = this.state.me
  let users = {}
  let items = []

  if (this.state.game.get('id')) {
    for (let i = 1; i <= this.state.game.get('users_count'); i++) {
      let user = this.state.game.get(`user${i}`)
      users[user.get('fb_id')] = {
        name: user.get('fb_name')
      , gender: user.get('gender')
      }
    }

    this.state.logs.forEach((log) => {
      let text = log.get('log').split('|')
      let [action, userFBId] = text
      let user = users[userFBId]
      let message = ''

      if (!user) {
        return
      }

      let isMe = me.get('fb_id') == userFBId

      if (action == 'PLAY') {
        let words = _.map(text[2].split(','), (word) => {
          return `<a href="http://sum.in.ua/?swrd=${word}">${word}</a>`
        })

        message += ` ${user.gender == "male" ? "склав" : "склала"}  ${words.join(', ')}, ${user.gender == "male" ? "отримав" : "отримала"} ${text[3]} очок`
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
      if (action == 'RESIGN') {
        message += ` ${user.gender == "male" ? "закiнчів" : "закiнчила"} гру`
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
      {items}
    </div>
  )
}