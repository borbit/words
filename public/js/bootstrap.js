var $ = require('jquery')
var moment = require('moment')
require('jquery.event.drag')($)
moment.locale('uk')

window.debug = require('debug')
window.track = (category, action) => {
  ga('send', 'event', category, action)
}

// prevent rubber effect
// document.body.addEventListener('touchmove', (e) => {
//   e.preventDefault()
// }, false)