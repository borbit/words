var React = require('react')
var Abc = require('../abc/abc')
var {EventEmitter} = require('events')
var _ = require('lodash')
var $ = require('jquery')

const LETTER_SIZE = 52
const LETTERS_WIDTH = LETTER_SIZE * 7
const LETTERS_HEIGHT = LETTER_SIZE
const LETTERS_OFFSET_TOP = 5

module.exports = (el, field) => {
  var $el = $(el)
  var $letters = $el.find('.letters__letter')
  var emitter = new EventEmitter()
  var reordering = false
  var letters = {}
  var placed = []

  var lettersOffsetLeft = ($el.width() - LETTERS_WIDTH) / 2
  var tableCellSize = $el.width() / 15
  var tableSize = $el.width()

  mapLetters()

  $letters.each(function() {
    var $letter = $(this)
    var $score = $letter.find('.letters__letter-score')
    var $tile = $letter.find('.letters__letter-tile')

    var letterIndex;
    var letterDeltaX = 0;
    var letterDeltaY = 0;
    var letterIndex;
    var letterCellX;
    var letterCellY;
    var letterLeft;

    $letter.css({height: tableCellSize})
    $letter.css({width: tableCellSize})

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
        removePlaced(letterCellX, letterCellY)
        letterDeltaX -= 6
        letterDeltaY -= 6
        letterCellX = null
        letterCellY = null
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
      
      centerX += lettersOffsetLeft
      centerY += LETTERS_OFFSET_TOP
      centerY += tableSize
      
      let cellX = ~~(centerX / tableCellSize)
      let cellY = ~~(centerY / tableCellSize)
      let letter = $letter.data('letter')

      // if current letter coords fall within table
      // then we try to place it there if possible
      if (!isOccupied(cellX, cellY) &&
          centerX > 0 && centerX < tableSize &&
          centerY > 0 && centerY < tableSize) {

        letterDeltaX = cellX * tableCellSize - lettersOffsetLeft - letterLeft
        letterDeltaY = cellY * tableCellSize - LETTERS_OFFSET_TOP - tableSize
        
        translateLetter($letter, letterDeltaX, letterDeltaY)
        $letter.addClass('letters__letter_placed')

        if (letter == ' ') {
          addEmpty(cellX, cellY, $tile)
        } else {
          addPlaced(cellX, cellY, letter)
        }

        letterCellX = cellX
        letterCellY = cellY

      // otherwise move letter back to panel
      } else {
        letterDeltaX = 0
        letterDeltaY = 0

        // if previous spot is not available then
        // find closed available and place there
        if (letters[letterIndex] && !reordering) {
          letterIndex = findEmpty(letterIndex)
        }
        // remove chosen letter if it was empty initialy
        if (letter == ' ') {
          $tile.empty()
        }
        
        translateLetter($letter, 0, 0)
        moveLetter($letter, letterIndex)
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

  function addPlaced(x, y, letter, empty) {
    if (empty) {
      placed.push({x: x, y: y, letter: letter, empty: true})
    } else {
      placed.push({x: x, y: y, letter: letter})
    }
    emitter.emit('place', placed)
  }

  function removePlaced(x, y) {
    placed = _.filter(placed, (letter) => {
      return letter.x != x || letter.y != y
    })
    emitter.emit('place', placed)
  }

  function isOccupied(x, y) {
    if (field[y*15+x] && field[y*15+x] != ' ') {
      return true
    }
    return _.any(placed, (letter) => {
      return letter.x == x && letter.y == y
    })
  }

  function addEmpty(x, y, $tile) {
    let $container = $('<div/>')

    function onLetter(letter) {
      addPlaced(x, y, letter, true)
      $container.remove()
      $tile.html(letter)
    }

    React.render(<Abc onLetter={onLetter}/>, $container[0])
    $container.appendTo($el)
  }

  emitter.destroy = function() {
    emitter.removeAllListeners()
    $letters.off('mousedown')
    $letters.off('mouseup')
    $letters.off('dragstart')
    $letters.off('dragend')
    $letters.off('drag')
  }

  return emitter
}