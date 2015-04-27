var React = require('react')
var GamesGame = require('./games__game')
var Avatar = require('../avatar/avatar')

module.exports = function() {
  var games = []

  this.state.games.forEach((game) => {
    games.push(<GamesGame game={game} me={this.state.me}/>)
  })

  return (
    <div className="games">
      <h4>Твiй хiд</h4>
      <div className="games__list">
        {games}
      </div>
    </div>
  )
}