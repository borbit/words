var React = require('react')
var ReactTransitionGroup = React.addons.CSSTransitionGroup
var Avatar = require('../avatar/avatar')
var moment = require('moment')
var cn = require('classnames')
var _ = require('lodash')

module.exports = function() {
  let items = []
  let users = {}
  let {me, game} = this.state

  if (game.get('id')) {
    for (let i = 1, user; i <= game.get('users_count'); i++) {
      user = game.get(`user${i}`)
      users[user.get('fb_id')] = {
        name: user.get('fb_name')
      , gender: user.get('gender')
      }
    }

    game.get('logs').forEach((log) => {
      let text = log.split('|')
      let [action, date, userFBId] = text
      let user = users[userFBId]
      let message = ''

      if (!user) {
        return
      }

      let isMe = me.get('fb_id') == userFBId
      let isMale = user.gender == 'male'

      switch (action) {
        case 'PLAY':
          let words = _.map(text[3].split(','), (word) => {
            return `<a href="http://sum.in.ua/?swrd=${word}">${word}</a>`
          })
          message += ` ${isMale ? "склав" : "склала"}  ${words.join(', ')},`
          message += ` ${isMale ? "отримав" : "отримала"} ${text[4]} очок`
          break
        case 'SWAP':
          message += ` ${isMale ? "помiняв" : "помiняла"} лiтери`
          message += ` та ${isMale ? "пропустив" : "пропустила"} хiд`
          break
        case 'PASS':
          message += ` ${isMale ? "пропустив" : "пропустила"} хiд`
          break
        case 'START':
          message += ` ${isMale ? "почав" : "почала"} гру`
          break
        case 'RESIGN':
          message += ` ${isMale ? "закiнчів" : "закiнчила"} гру`
          break
        case 'FINISH':
          message += `Гейм овер! Я ${isMale ? "виграв" : "виграла"}!`
          break
        case 'DONE':
          message += 'Ой, всьо!'
          break
      }

      items.push({
        isMe: isMe
      , date: +date
      , userFBId: userFBId
      , message: message
      })
    })

    game.get('chat').forEach((message) => {
      let [userFBId, date, text] = message.split('|')
      let isMe = me.get('fb_id') == userFBId
      
      items.push({
        isMe: isMe
      , isChat: true
      , date: +date
      , userFBId: userFBId
      , message: text
      })
    })
  }

  items = _.sortBy(items, item => item.date)
  items = _.map(items, (item) => {
    let className = cn({
      'stream__item': true
    , 'stream__item_chat': item.isChat
    , 'stream__item_me': item.isMe
    })

    return (
      <div className={className} key={item.date}>
        <div className="stream__balloon">
          <div className="stream__avatar">
            <Avatar facebookId={item.userFBId} width="20" height="20"/>
          </div>
          <div className="stream__message">
            <p className="stream__message-text" dangerouslySetInnerHTML={{__html: item.message}}/>
            <i className="stream__message-date">{moment(item.date).fromNow()}</i>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className="stream" key={game.get('id') || 0}>
      <div className="stream__line" ref="line">
        <div className="stream__line-wrap">
          <div className="stream__items" ref="items">
            <ReactTransitionGroup transitionName="stream__item">
              {items}
            </ReactTransitionGroup>
          </div>
        </div>
      </div>
      <div className="stream__foot">
        <i className="stream__input-icon fa fa-comment"></i>
        <input type="text"
          className="stream__input"
          onKeyDown={this.onKeyDown} 
          disabled={!game.get('id')}
          ref="input"/>
      </div>
    </div>
  )
}