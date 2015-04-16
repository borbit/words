var React = require('react')

module.exports = function() {
  var transform = `translate(
    ${this.state.deltaX + this.props.index*60}px,
    ${this.state.deltaY}px
  )`
  
  return (
    <div className="panel__letter" style={{transform: transform}} onMouseOver={this.onMouseOver}>
      {this.props.letter}
    </div>
  )
}