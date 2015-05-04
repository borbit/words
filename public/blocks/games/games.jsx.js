var React = require('react')
var GamesGame = require('./games__game')
var Avatar = require('../avatar/avatar')

module.exports = function() {
  var gamesMyTurn = []
  var gamesWaiting = []

  this.state.games.forEach((game) => {
    let item = <GamesGame game={game} me={this.state.me}/>

    if (game.get('my_turn')) {
      gamesMyTurn.push(item)
    } else {
      gamesWaiting.push(item)
    }
  })

  return (
    <div className="games">
      {!!gamesMyTurn.length &&
        <section className="games__group">
          <h4>Мiй хiд <span className="badge">{gamesMyTurn.length}</span></h4>
          <div className="games__list list-group">{gamesMyTurn}</div>
        </section>}
      {!!gamesWaiting.length &&
        <section className="games__group">
          <h4>В очiкуванi <span className="badge">{gamesWaiting.length}</span></h4>
          <div className="games__list list-group">{gamesWaiting}</div>
        </section>}
    </div>
  )
}