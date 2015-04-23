var React = require('react')
var Field = require('../field/field')
var Letters = require('../letters/letters')

module.exports = function() {
  return (
    <div className="board">
      <div className="board__head">
        <div className="btn-group">
          <button className="btn btn-default" style={{width: 300, paddingTop: 4, paddingBottom: 4}} disabled>
            <i className="fa fa-user"></i><br/>
            <small>Роберт Дениро</small>
          </button>
          <button className="btn btn-default" style={{width: 301, paddingTop: 4, paddingBottom: 4}} disabled>
            <i className="fa fa-user"></i><br/>
            <small>Сильвестр Сталоне</small>
          </button>
        </div>
      </div>
      <div className="board__tabel"><Field/></div>
      <div className="board__foot">
        <Letters/>
      </div>
    </div>
  )
}