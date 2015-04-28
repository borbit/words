var events = require('events')
var _ = require('lodash')
var $ = require('jquery')

var LETTER_SIZE = 52
var LETTERS_WIDTH = LETTER_SIZE * 7
var LETTERS_HEIGHT = LETTER_SIZE
var LETTERS_OFFSET_LEFT = (620 - LETTERS_WIDTH) / 2 - 10
var LETTERS_OFFSET_TOP = 10
var TABLE_CELL_SIZE = 40
var TABLE_SIZE = 600

module.exports = (el) => {
  var $el = $(el)
  var $letters = $el.find('.letters__letter')
  var emitter = new events.EventEmitter()
  var reordering = false
  var letters = {}
  var placed = []

  mapLetters()


  $letters.each(function() {
    var $letter = $(this)
    var letterIndex;
    var letterDeltaX = 0;
    var letterDeltaY = 0;
    var letterIndex;
    var letterLeft;

    $letter.on('drag', (e, d) => {
      translateLetter($letter,
        letterDeltaX + d.deltaX,
        letterDeltaY + d.deltaY)

      // do nothing while animating
      if (reordering) return

      var centerX = letterDeltaX + d.deltaX + LETTER_SIZE / 2 + letterLeft
      var centerY = letterDeltaY + d.deltaY + LETTER_SIZE / 2

      // do nothing if current letter coords
      // don't fall within letters block space
      if (centerX < 0 || centerX > LETTERS_WIDTH ||
          centerY < 0 || centerY > LETTERS_HEIGHT) {
        return
      }

      letterIndex = ~~(centerX / LETTER_SIZE)

      if (letters[letterIndex]) {
        reorderLetters(findEmpty(letterIndex), letterIndex)
      }
    })

    $letter.on('mousedown', () => {
      $letter.addClass('letters__letter_dragging')
    })
    $letter.on('mouseup', () => {
      $letter.removeClass('letters__letter_dragging')
    })

    $letter.on('dragstart', (e, d) => {
      // start dragging from table
      if ($letter.hasClass('letters__letter_placed')) {
        $letter.removeClass('letters__letter_placed')
        letterDeltaX -= 6
        letterDeltaY -= 6
      // start dragging from panel
      } else {
        letterIndex = getIndex($letter)
        letterLeft = getLeft($letter)
        delete letters[letterIndex]
      }
    })

    $letter.on('dragend', (e, d) => {
      // calc letter coordinates related to the table
      var centerX = letterDeltaX + d.deltaX + LETTER_SIZE / 2 + letterLeft
      var centerY = letterDeltaY + d.deltaY + LETTER_SIZE / 2
      
      centerX += LETTERS_OFFSET_LEFT
      centerY += LETTERS_OFFSET_TOP
      centerY += TABLE_SIZE
      
      var cellX = ~~(centerX / TABLE_CELL_SIZE)
      var cellY = ~~(centerY / TABLE_CELL_SIZE)

      // if current letter coords fall within table
      // then we try to place it there if possible
      if (!isPlaced(cellX, cellY) &&
          centerX > 0 && centerX < TABLE_SIZE &&
          centerY > 0 && centerY < TABLE_SIZE) {

        letterDeltaX = cellX * TABLE_CELL_SIZE - LETTERS_OFFSET_LEFT - letterLeft
        letterDeltaY = cellY * TABLE_CELL_SIZE - LETTERS_OFFSET_TOP - TABLE_SIZE
        
        $letter.addClass('letters__letter_placed')
        translateLetter($letter, letterDeltaX, letterDeltaY)
        addPlaced(cellX, cellY)

      // otherwise move letter back to panel
      } else {
        letterDeltaX = 0
        letterDeltaY = 0

        // if previous spot is not available then
        // find closed available and place there
        if (letters[letterIndex] && !reordering) {
          letterIndex = findEmpty(letterIndex)
        }
        
        translateLetter($letter, 0, 0)
        moveLetter($letter, letterIndex)
        removePlaced(cellX, cellY)
        mapLetters()
      }
    })
  })

  function mapLetters() {
    letters = {}
      
    $letters.each(function() {
      var $letter = $(this)    
      
      if (!$letter.hasClass('letters__letter_placed') &&
          !$letter.hasClass('letters__letter_dragging')) {
        letters[getIndex($letter)] = $letter
      }
    })
  }

  // find closest empty index
  function findEmpty(index) {
    for (var i = index; i < 7; i++) {
      if (!letters[i]) return i}
    for (var i = index; i >= 0; i--) {
      if (!letters[i]) return i}
  }

  function getIndex($letter) {
    return getLeft($letter) / LETTER_SIZE
  }

  function getLeft($letter) {
    return +$letter.css('left').replace('px', '')
  }
  
  function translateLetter($letter, x, y) {
    $letter.css({transform: `translate(${x}px,${y}px)`})
  }

  // move letter to new position by index
  function moveLetter($letter, index) {
    $letter.css('left', LETTER_SIZE * index)
  }

  // move a row of letters on one cell left or
  // right considering where the empty index is
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

  // the same as moveLetters but with animation
  function reorderLetters(eindex, oindex) {
    $el.addClass('letters_animate')
    moveLetters(eindex, oindex)
    reordering = true

    setTimeout(function() {
      $el.removeClass('letters_animate')
      reordering = false
      mapLetters()
    }, 150)
  }

  function addPlaced(x, y) {
    placed.push([x, y])
    emitter.emit('change', placed)
  }

  function removePlaced(x, y) {
    placed = _.remove(placed, (letter) => {
      return letter[0] == x && letter[1] == y
    })
  }

  function isPlaced(x, y) {
    return false
    return _.any(placed, (letter) => {
      return letter[0] == x && letter[1] == y
    })
  }

  return {
    destroy() {
      $letters.off('drag')
      $letters.off('mousedown')
      $letters.off('mouseup')
      $letters.off('dragstart')
      $letters.off('dragend')
    }
  }
}