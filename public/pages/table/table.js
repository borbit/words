require('../../js/bootstrap')

var React = require('react')
var Field = require('../../blocks/field/field')
var io = require('io-client')

React.render(<Field/>, document.getElementsByTagName('main')[0])

var server = io.connect('ws://localhost:5001')

server.on('connect', () => {
  console.log('ping')
  
  server.emit('ping', 'test', (data) => {
    console.log('pong')
    console.log(data)
  })
})