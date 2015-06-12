var $ = require('jquery')
var moment = require('moment')
window.debug = require('debug')
require('jquery.event.drag')($)
moment.locale('uk')

// prevent rubber effect
document.body.addEventListener('touchmove', (e) => {
  e.preventDefault()
}, false)