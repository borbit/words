const config = require('config')
const request = require('request')

module.exports = {
  lookup(text, cb) {
    let options = {
      json: true
    , url: config.yandex_lookup_url
    , qs: {
        key: config.yandex_api_key
      , lang: 'ru-ru'
      , text: text
      }
    }
    request(options, (err, res, data) => {
      if (err) return cb(err)
      cb(null, data.def)
    })
  }
}