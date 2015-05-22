var $ = require('jquery')
var moment = require('moment')
require('jquery.event.drag')($)
moment.locale('uk')

// prevent rubber effect
document.body.addEventListener('touchmove', (e) => {
  e.preventDefault()
}, false)