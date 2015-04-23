var React = require('react')
var React = require('react')
var Friends = require('../friends/friends')
var Board = require('../board/board')
var Games = require('../games/games')
var Me = require('../me/me')

module.exports = function() {
  return (
    <div className="layout">
      <hr className="hr hr_ver" style={{marginLeft: -112}}/>
      <hr className="hr hr_ver" style={{marginLeft: -132}}/>
      <hr className="hr hr_ver" style={{marginLeft: -488}}/>
      <hr className="hr hr_ver" style={{marginLeft: 488}}/>

      <hr className="hr hr_hor" style={{marginTop: -360}}/>
      <hr className="hr hr_hor" style={{marginTop: -310}}/>
      <hr className="hr hr_hor" style={{marginTop: -300}}/>
      <hr className="hr hr_hor" style={{marginTop: 360}}/>

      <div className="layout__page">
        <div className="layout__content">
          <Board/>
        </div>
        <div className="layout__aside">
          <div className="btn-group">
            <button className="btn btn-default active" style={{width: 90}}>
              <i className="fa fa-gamepad"></i><br/>
              <small>Поточнi iгри</small>
            </button>
            <button className="btn btn-default" style={{width: 90}}>
              <i className="fa fa-user"></i><br/>
              <small>Профiль</small>
            </button>
            <button className="btn btn-default" style={{width: 90}}>
              <i className="fa fa-users"></i><br/>
              <small>Друзi</small>
            </button>
            <button className="btn btn-default" style={{width: 89}}>
              <i className="fa fa-star"></i><br/>
              <small>Лiдерборд</small>
            </button>
          </div>
          <Games/>
          <Friends/>
        </div>
      </div>
    </div>
  )
}