var async = require('async')
var request = require('request')
var cheerio = require('cheerio')
var iconv = require('iconv')
var path = require('path')
var _ = require('lodash')

var client = require('./lib/redis')
var host = 'http://slovnyk.ua/'
var crawled = []

function crawlPage(url, cb) {
  request({url: host + url, encoding: 'binary'}, (err, res, data) => {
    if (err) return cb(err)

    let conv = new iconv.Iconv('windows-1251', 'utf8')
    data = new Buffer(data, 'binary')
    data = conv.convert(data).toString()

    let $ = cheerio.load(data)
    let letters = []
    let pages = []
    let words = []

    $('.letterlink').each(function() {
      letters.push({
        url: $(this).attr('href')
      , txt: $(this).text()
      })
    })

    $('.wordhref,.pagelink_a').each(function() {
      pages.push({
        url: $(this).attr('href')
      , txt: $(this).text()
      })
    })

    words = _.filter(pages, (i) => {
      let unique = _.unique(i.txt.split(''))

      return i.txt.length > 2 &&
              ~i.url.indexOf('swrd') &&
             !~i.txt.indexOf(' ') &&
             !~i.txt.indexOf('-') &&
             !~i.txt.indexOf('!') &&
             !/\d/.test(i.txt) &&
             unique.length > 1
    })

    words = _.map(words, (word) => {
      word.txt = word.txt.replace('!', '')
      word.txt = word.txt.toLowerCase()
      return word
    })

    if (words.length) {
      console.log(words.length)
    }

    pages = pages.concat(letters)
    pages = _.filter(pages, (i) => {
      return !~i.url.indexOf('swrd') &&
             !~crawled.indexOf(i.url)
    })

    _.each(pages, (i) => {
      crawled.push(i.url)
    })

    async.waterfall([
      (cb) => {
        if (!words.length) return cb()
        words = _.map(words, word => word.txt)
        client.sadd(['dict', ...words], (err) => {
          if (err) console.log(err)
          cb()
        })
      },
      (cb) => {
        if (!pages.length) return cb()
        async.eachSeries(pages, (item, cb) => {
          setTimeout(() => {
            console.log(`PAGE "${item.url}"`)
            crawlPage(item.url, cb)
          }, 250)
        }, cb)
      }
    ], cb)
  })
}

crawlPage('index.php?s1=0&s2=0')