var React = require('react')
var React = require('react')
var Friends = require('../friends/friends')
var Board = require('../board/board')
var Games = require('../games/games')
var Me = require('../me/me')

module.exports = function() {
  return (
    <div className="layout">
      <div className="layout__page">
        <div className="layout__content">
          <Board/>
        </div>
        <div className="layout__aside">
          <div className="panel panel-default">
            <div className="panel-heading">
              <div className="btn-group">
                <button className="btn btn-default active" style={{paddingTop: 4, paddingBottom: 4}}>
                  <i className="fa fa-gamepad"></i><br/>
                  <small>Поточнi iгри</small>
                </button>
                <button className="btn btn-default" style={{paddingTop: 4, paddingBottom: 4}}>
                  <i className="fa fa-user"></i><br/>
                  <small>Профiль</small>
                </button>
                <button className="btn btn-default" style={{paddingTop: 4, paddingBottom: 4}}>
                  <i className="fa fa-users"></i><br/>
                  <small>Друзi</small>
                </button>
                <button className="btn btn-default" style={{paddingTop: 4, paddingBottom: 4}}>
                  <i className="fa fa-star"></i><br/>
                  <small>Лiдерборд</small>
                </button>
              </div>
            </div>
          </div>
          <div className="panel-body">
            asdasdasd
            <Games/>
            <Friends/>
          </div>
        </div>
      </div>
    </div>
  )
}