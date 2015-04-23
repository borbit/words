var React = require('react')
var Avatar = require('../avatar/avatar')
var GamesGame = require('./games__game')

module.exports = function() {
  var games = []

  this.state.games.forEach((game) => {
    if (!game) return
    games.push(<GamesGame game={game}/>)
  })

  return (
    <div className="games">
      <div className="games__list">
        {games}
      </div>
    </div>
  )
}