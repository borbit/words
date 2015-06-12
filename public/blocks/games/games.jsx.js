var React = require('react')
var GamesGame = require('./games__game')
var Avatar = require('../avatar/avatar')

module.exports = function() {
  let gamesMyTurn = []
  let gamesWaiting = []
  let gamesFinished = []
  let games = this.state.games.sortBy((game) => {
    return -(
      game.get('finished_at') ||
      game.get('last_turn_at') ||
      game.get('created_at')
    )
  })

  let myFBId = this.state.me.get('fb_id')

  games.forEach((game) => {
    let isCurrent = game.get('id') == this.state.game.get('id')
    let isLoading = game.get('id') == this.state.game.get('loading')
    let myIndex = false

    for (let i = 1; i <= game.get('users_count'); i++) {
      if (game.get(`user${i}`).get('fb_id') == myFBId) {
        myIndex = i
        break
      }
    }

    let item = <GamesGame
      key={game.get('id')}
      current={isCurrent}
      loading={isLoading}
      game={game}/>
    
    if (game.get('finished_at')) {
      gamesFinished.push(item)
    } else if (game.get('current_turn') == myIndex) {
      gamesMyTurn.push(item)
    } else {
      gamesWaiting.push(item)
    }
  })

  let finishedCount = gamesFinished.length

  if (finishedCount > 1 && !this.state.expandFinished) {
    gamesFinished = [gamesFinished[1]]
    gamesFinished.push(
      <div className="games__expand list-group-item" onClick={() => this.setState({expandFinished: true})}>
        <i className="fa fa-caret-down"></i>
      </div>
    )
  }

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
          <h4 className="games__title">Закiнченi <span className="badge">{finishedCount}</span></h4>
          <div className="games__list list-group">{gamesFinished}</div>
        </section>}
    </div>
  )
}