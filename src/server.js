const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./server/routes')

const app = express()
if (process.env.NODE_ENV === 'test') {
  process.title = 'contact_server'
}

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use((request, response, next) => {
  response.locals.query = ''
  next()
})

app.use('/', routes)

app.use((request, response) => {
  response.status(404).render('not_found')
})

const localPort = process.env.NODE_ENV === 'test' ? process.env.TEST_PORT : process.env.DEV_PORT
const port = process.env.PORT || localPort

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

module.exports = app
