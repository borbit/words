var async = require('async')
var request = require('request')
var cheerio = require('cheerio')
var redis = require('redis')
var path = require('path')
var _ = require('lodash')

var client = redis.createClient();
var host = 'http://hrinchenko.com/'
var crawled = []

function crawlPage(url, cb) {
  request({url: host + url, encoding: 'utf-8'}, (err, res, data) => {
    if (err) return cb(err)

    let $ = cheerio.load(data) 
    let letters = []
    let pages = []
    let words = []

    $('.list_of_letters a').each(function() {
      letters.push({
        url: $(this).attr('href')
      , txt: $(this).text()
      })
    })

    $('.list_pagination a').each(function() {
      let pageUrl = path.dirname(url) + '/' + $(this).attr('href')

      if (!~crawled.indexOf(pageUrl)) {
        crawled.push(pageUrl)

        pages.push({
          url: pageUrl
        , txt: $(this).text()
        })
      }
    })

    $('.list_of_words a').each(function() {
      words.push({
        url: $(this).attr('href')
      , txt: $(this).text()
      })
    })

    words = _.filter(words, (i) => {
      let unique = _.unique(i.txt.split(''))

      return i.txt.length > 1 &&
             !~i.txt.indexOf(' ') &&
             !~i.txt.indexOf('-') &&
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

crawlPage('/alfavit.html')