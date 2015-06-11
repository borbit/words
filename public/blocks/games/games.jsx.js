var React = require('react')
var GamesGame = require('./games__game')
var Avatar = require('../avatar/avatar')

module.exports = function() {
  var gamesMyTurn = []
  var gamesWaiting = []
  var gamesFinished = []
  var games = this.state.games.sortBy((game) => {
    return -(
      game.get('finished_at') ||
      game.get('last_turn_at') ||
      game.get('created_at')
    )
  })

  let myFBId = this.state.me.get('fb_id')

  games.forEach((game) => {
    let item
    let isCurrent = false
    let myIndex = false

    if (this.state.game) {
      isCurrent = game.get('id') == this.state.game.get('id')
    }

    for (let i = 1; i <= game.get('users_count'); i++) {
      if (game.get(`user${i}`).get('fb_id') == myFBId) {
        myIndex = i
        break
      }
    }

    if (game.get('finished_at')) {
      item = <GamesGame game={game} current={isCurrent} key={game.get('id')}/>
    } else {
      item = <GamesGame game={game} current={isCurrent} key={game.get('id')}/>
    }
    
    if (game.get('finished_at')) {
      gamesFinished.push(item)
    } else if (game.get('current_turn') == myIndex) {
      gamesMyTurn.push(item)
    } else {
      gamesWaiting.push(item)
    }
  })

  return (
    <div className="games">
      {!!gamesMyTurn.length &&
        <section className="games__group">
          <h4 className="games__title">Мiй хiд <span className="badge">{gamesMyTurn.length}</span></h4>
          <div className="games__list list-group">{gamesMyTurn}</div>
        </section>}
      {!!gamesWaiting.length &&
        <section className="games__group">
          <h4 className="games__title">В очiкуванi <span className="badge">{gamesWaiting.length}</span></h4>
          <div className="games__list list-group">{gamesWaiting}</div>
        </section>}
      <section className="games__group">
        {!games.count() && <h4 className="games__title">Привiт <span className="badge">:)</span></h4>}
        <div className="games__list">
          <button className="btn btn-block btn-default" onClick={this.onNewClick}>
            Почати нову гру
          </button>
        </div>
      </section>
      {!!gamesFinished.length &&
        <section className="games__group">
          <h4 className="games__title">Закiнченi <span className="badge">{gamesFinished.length}</span></h4>
          <div className="games__list list-group">{gamesFinished}</div>
        </section>}
    </div>
  )
}