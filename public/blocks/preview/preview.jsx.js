var React = require('react')
var ReactCanvas = require('react-canvas')
var BONUSES = require('../../../lib/bonuses')
var Surface = ReactCanvas.Surface;
var Layer = ReactCanvas.Layer;
var _ = require('lodash')

const CELL_SIZE = 3

module.exports = function() {
  let cells = []

  _.each(_.range(0, 15), (y) => {
  _.each(_.range(0, 15), (x) => {
    let letter = this.props.field[y*15+x]
    let background

    if (letter && letter != ' ') {
      let b = _.random(40, 120)
      background = `rgb(${b},${b},${b})`
    } else if (BONUSES[y][x]) {
      background = '#ddd'
    } else {
      return
    }
      
    let style = {
      backgroundColor: background
    , top: y * CELL_SIZE
    , left: x * CELL_SIZE
    , width: CELL_SIZE
    , height: CELL_SIZE
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