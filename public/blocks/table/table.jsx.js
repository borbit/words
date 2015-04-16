var React = require('react')
var ReactCanvas = require('react-canvas')
var _ = require('lodash')

var Surface = ReactCanvas.Surface
var Layer = ReactCanvas.Layer
var Image = ReactCanvas.Image
var Text = ReactCanvas.Text

module.exports = function() {
  // var layers = []

  // _.range(0, 14).forEach((x) => {
  //   _.range(0, 14).forEach((y) => {
  //     var style = {
  //       width: 40,
  //       height: 40, 
  //       borderWidth: 10,
  //       borderColor: '#000',
  //       left: x * 43 + 0.5,
  //       top: y * 43 + 0.5
  //     }

  //     layers.push(
  //       <Layer style={style}></Layer>
  //     )
  //   })
  // })

  // <Surface width="602" height="602" left={0} top={0}>
  //   {layers}
  // </Surface>

  var cells = []

  _.range(0, 15).forEach((x) => {
    _.range(0, 15).forEach((y) => {
      cells.push(
        <div className="table__cell"></div>
      )
    })
  })

  return (
    <div className="table">
      {cells}
    </div>
  )
}