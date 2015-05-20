var React = require('react')
var ReactCanvas = require('react-canvas')
var Surface = ReactCanvas.Surface;
var Layer = ReactCanvas.Layer;
var _ = require('lodash')

const CELL_SIZE = 5

module.exports = function() {
  let cells = []

  _.each(_.range(0, 15), (y) => {
  _.each(_.range(0, 15), (x) => {
    let letter = this.props.field[y*15+x]
    
    if (!letter || letter == ' ') {
      return
    }
      
    let style = {
      backgroundColor: '#000'
    , top: y * CELL_SIZE + 1
    , left: x * CELL_SIZE + 1
    , width: CELL_SIZE - 1
    , height: CELL_SIZE - 1
    }

    cells.push(
      <Layer style={style}/>
    )
  })
  })


  return (
    <Surface width={CELL_SIZE*15} height={CELL_SIZE*15}>
      {cells}
    </Surface>
  )
}