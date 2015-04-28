var React = require('react')
var Friends = require('../friends/friends')
var Games = require('../games/games')
var Me = require('../me/me')

module.exports = function() {
  return (
    <div className="aside panel panel-default">
      <div className="aside__head panel-heading">
        <div className="btn-group">
          <button className="aside__tab btn btn-default active">
            <i className="fa fa-gamepad"></i><br/>
          </button>
          <button className="aside__tab btn btn-default">
            <i className="fa fa-users"></i><br/>
          </button>
          <button className="aside__tab btn btn-default">
            <i className="fa fa-user"></i><br/>
          </button>
          <button className="aside__tab btn btn-default">
            <i className="fa fa-star"></i><br/>
          </button>
        </div>
      </div>
      <div className="aside__body panel-body">
        <Games/>
      </div>
    </div>
  )
}