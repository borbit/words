var React = require('react')
var _ = require('lodash')

module.exports = function() {
  var letters = _.map(this.state.letters, (letter, i) => {
    return (
      <div className="panel__letter" style={{left: i*60}}>
        {letter.letter}
      </div>
    )
  })
  
  return (
    <div className="panel__letters">
      {letters}
    </div>
  )
}