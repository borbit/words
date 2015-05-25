var async = require('async')
var request = require('request')
var cheerio = require('cheerio')
var redis = require('redis')
var _ = require('lodash')

var client = redis.createClient();
var host = 'http://sum.in.ua/'

function crawlPage(url, cb) {
  request({url: host + url, encoding: 'utf-8'}, (err, res, data) => {
    if (err) return cb(err)

    let $ = cheerio.load(data) 
    let items = []

    $('#vkazivnyk li a').each(function() {
      items.push({
        url: $(this).attr('href')
      , txt: $(this).text()
      })
    })

    let pages = _.filter(items, i => ~i.url.indexOf('vkazivnyk'))
    let words = _.filter(items, (i) => {
      let unique = _.unique(i.txt.split(''))

      return i.txt.length > 1 &&
             !~i.url.indexOf('vkazivnyk') &&
             !~i.txt.indexOf(' ') &&
             !~i.txt.indexOf('-') &&
             !/\d/.test(i.txt) &&
             unique.length > 1
    })

    console.log(words.length)

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
            console.log(`PAGE "${item.txt}"`)
            crawlPage(item.url, cb)
          }, 250)
        }, cb)
      }
    ], cb)
  })
}

crawlPage('/vkazivnyk')