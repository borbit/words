var React = require('react')
var Field = require('../field/field')
var LayoutMenu = require('./layout__menu')

module.exports = function() {
  var rullers = {
    menu: [
      <hr className="hr hr_ver" style={{marginLeft: 147}}/>
    , <hr className="hr hr_ver" style={{marginLeft: -473}}/>
    , <hr className="hr hr_ver" style={{marginLeft: 473}}/>
    , <hr className="hr hr_hor" style={{marginTop: -345}}/>
    , <hr className="hr hr_hor" style={{marginTop: 345}}/>
    ],
    game: [
      <hr className="hr hr_ver" style={{marginLeft: 147}}/>
    , <hr className="hr hr_ver" style={{marginLeft: -473}}/>
    , <hr className="hr hr_ver" style={{marginLeft: 473}}/>
    , <hr className="hr hr_hor" style={{marginTop: -345}}/>
    , <hr className="hr hr_hor" style={{marginTop: 345}}/>
    , <hr className="hr hr_hor" style={{marginTop: 275}}/>
    ]
  } 

  return (
    <div className="layout">
      {this.state.page == 'game' && <Field/>}
      {this.state.page == 'menu' && <LayoutMenu/>}
      {rullers[this.state.page]}
    </div>
  )
}