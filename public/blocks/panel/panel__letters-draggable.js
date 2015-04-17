var _ = require('lodash')
var $ = require('jquery')

var LETTER_SIZE = 60

module.exports = (el) => {
  var $el = $(el)
  var $letters = $el.find('.panel__letter')
  var reordering = false
  var occupied = []
  var letters = {}

  mapLetters()

  $letters.each(function() {
    var letterLeft;
    var letterIndex;

    var $letter = $(this)

    $letter.on('drag', (e, d) => {
      $letter.css({transform: `translate(
        ${d.deltaX}px,
        ${d.deltaY}px
      )`})

      if (reordering) return

      var centerX = d.deltaX + LETTER_SIZE / 2 + letterLeft
      var centerY = d.deltaY + LETTER_SIZE / 2

      _.each(occupied, (i) => {
        var $occupied = letters[i]
        var oLeft = $occupied.data('left')

        if (centerX > oLeft && 
            centerX < oLeft + LETTER_SIZE &&
            centerY > 0 && centerY < LETTER_SIZE) {
          
          var oIndex = calcIndex($occupied)
          var eIndex = findEmpty(oIndex)
          reorderLetters(eIndex, oIndex)
          letterIndex = oIndex
        }
      })
    })

    $letter.on('dragstart', (e, d) => {
      $letter.addClass('panel__letter_dragging')
      $letter.data('dragging', true)

      letterIndex = calcIndex($letter)
      letterLeft = $letter.position().left
      releaseLetter($letter)
    })

    $letter.on('dragend', (e, d) => {
      $letter.removeClass('panel__letter_dragging')
      $letter.css({transform: 'translate(0,0)'})
      $letter.data('dragging', null)
      
      moveLetter($letter, letterIndex)
      mapLetters()
    })
  })

  function mapLetters() {
    occupied = []
    letters = {}
      
    $letters.each(function() {
      var $letter = $(this)    
      var index = calcIndex($letter)
      
      $letter.data('left', $letter.position().left)

      if (!$letter.data('dragging')) {
        letters[index] = $letter
        occupied.push(index)
      }
    })
  }

  function releaseLetter($letter) {
    var index = calcIndex($letter)
    occupied = _.without(occupied, index)
    delete letters[index]
  }

  function calcIndex($letter) {
    return $letter.css('left').replace('px', '') / LETTER_SIZE
  }

  function findEmpty(index) {
    for (var i = index; i < 7; i++) {
      if (!_.contains(occupied, i)) return i}
    for (var i = index; i >= 0; i--) {
      if (!_.contains(occupied, i)) return i}
  }
  
  function moveLetter($letter, index) {
    $letter.css('left', LETTER_SIZE * index)
  }

  function moveLetters(eindex, oindex) {
    if (eindex < oindex) {
      for (var i = eindex + 1; i <= oindex; i++) {
        moveLetter(letters[i], i - 1)
      }
    } else {
      for (var i = eindex - 1; i >= oindex; i--) {
        moveLetter(letters[i], i + 1)
      }
    }
  }

  function reorderLetters(eindex, oindex) {
    $el.addClass('panel_animate')
    moveLetters(eindex, oindex)
    reordering = true

    setTimeout(function() {
      $el.removeClass('panel_animate')
      reordering = false
      mapLetters()
    }, 150)
  }
}

  

  