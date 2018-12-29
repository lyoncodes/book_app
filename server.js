'use strict'
// Application Dependencies
const express = require('express')
const pg = require('pg')

// Applicatoin Setup
const app = express()
const PORT = process.env.PORT || 3000

// Parse request.body
app.use(express.urlencoded({extended: true}))
app.use(express.static('./public'));

// Database Setup
const client = new pg.Client('postgres://localhost:5432/books_app')
client.connect()
client.on('error', err => console.error(err))

// Set the view engine for server-side templating
app.set('view engine', 'ejs')

// Routes
// Home Route
app.get('/', (req, res) => {
  res.render('pages/index', {
    hello: 'World'
  });
});


// Search Route
app.post('/searches', search)

function search(req, res) {
  let searchStr = req.body.search[0]
  let searchStr = req.body.search[1]
  let url = 'https://www.googleapis.com/books/v1/volumes?q=search'

  // Search Type conditionals
  if(searchType === 'title') {
    url += `+intitle:${searchStr}`
  } else if (searchStr === 'author') {
    url += `inauthor:${searchStr}`
  }
}

// Localhost listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
