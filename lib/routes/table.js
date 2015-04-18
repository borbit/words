module.exports = (app) => {
  app.get('/table', (req, res) => {
    res.render('table/table')
  })
}