var React = require('react')
var Friends = require('../friends/friends')
var Games = require('../games/games')
var cn = require('classnames')
var _ = require('lodash')

module.exports = function() {
  let tabs = [
    {key: 'games', icon: 'gamepad'}
  , {key: 'leaderboard', icon: 'trophy'}
  , {key: 'friends', icon: 'users'}
  , {key: 'profile', icon: 'user'}
  ]

  tabs = _.map(tabs, (tab) => {
    let className = cn({
      'aside__tab btn btn-default': true
    , 'active': tab.key == this.state.tab
    })
    return (
      <button className={className} onClick={this.onTab.bind(this, tab.key)}>
        <i className={`fa fa-${tab.icon}`}></i>
      </button>
    )
  })

  return (
    <div className="aside panel panel-default">
      <div className="aside__head panel-heading">
        <div className="btn-group">{tabs}</div>
      </div>
      <div className="aside__body panel-body">
        {this.state.tab == 'games' &&
          <Games/>}
        {this.state.tab == 'friends' &&
          <Friends/>}
      </div>
    </div>
  )
}