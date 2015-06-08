var $ = require('jquery')

if (document) {
  var $document = $(document)
}

module.exports = {
  componentDidMount() {
    $document.on('keydown', this._onEscape)
  },

  componentWillUnmount() {
    $document.unbind('keydown', this._onEscape)
  },

  _onEscape(e) {
    if (e.keyCode == 27) {
      this.onEscape()
    }
  }
}