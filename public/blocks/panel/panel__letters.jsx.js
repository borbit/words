var React = require('react')
var PanelLetter = require('./panel__letter')
var _ = require('lodash')

module.exports = function() {
  var letters = _.map(this.state.letters, (letter) => {
    return <PanelLetter
      id={letter.id}
      index={letter.index}
      letter={letter.letter}
      onDragStart={this.onLetterDragStart}
      onDragEnd={this.onLetterDragEnd}
      onDrag={this.onLetterDrag}/>
  })
  
  return (
    <div className="panel__letters">
      {letters}
    </div>
  )
}