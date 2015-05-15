var React = require('react')
var GamesGameActive = require('./games__game_active')
var GamesGameFinished = require('./games__game_finished')
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

  games.forEach((game) => {
    let item
    let isCurrent = false

    if (this.state.game) {
      isCurrent = game.get('id') == this.state.game.get('id')
    }

    if (game.get('finished_at')) {
      item = <GamesGameFinished game={game} current={isCurrent}/>
    } else {
      item = <GamesGameActive game={game} current={isCurrent}/>
    }
    
    if (game.get('finished_at')) {
      gamesFinished.push(item)
    } else if (game.get('my_turn')) {
      gamesMyTurn.push(item)
    } else {
      gamesWaiting.push(item)
    }
  })

  return (
    <div className="games">
      <section className="games__group">
        <div className="games__list list-group">
          {gamesMyTurn}
          {gamesWaiting}
          {gamesFinished}
        </div>
      </section>
    </div>
  )
}