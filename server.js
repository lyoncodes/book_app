'use strict'
// Application Dependencies
const express = require('express')
const pg = require('pg')
const superagent = require('superagent')

// Applicatoin Setup
const app = express()
const PORT = process.env.PORT || 3000

// Parse request.body
app.use(express.urlencoded({extended: true}))
app.use(express.static('./public'))

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

function handleError(res, error) {
  console.log(error);
  res.render('pages/error', {err: error})
}


// Search Route
app.post('/searches', searchBooks)

function search (req, res) {
  console.log(req)
  let searchStr = req.body.search[0]
  let searchType = req.body.search[1]
  let url = 'https://www.googleapis.com/books/v1/volumes?q='

  // Search Type conditionals
  if (searchType === 'title') {
    url += `+intitle:${searchStr}`
  } else if (searchType === 'author') {
    url += `inauthor:${searchStr}`
  }
  // Superagent Request
  return superagent.get(url)
    .then(result => {
      // console.log(result)
      let books = result.body.items.map(book => new Book(book))
      res.render('pages/books/show', {books})
    })
}
// Book Constructor
function Book (obj) {
  console.log(obj)
  this.title = obj.volumeInfo.title ? obj.volumeInfo.title : 'No Title Available'
  this.author = obj.volumeInfo.authors ? obj.volumeInfo.authors.join(',') : 'Unknown'
  this.discription = obj.volumeInfo.discription ? obj.volumeInfo.discription : 'No discription available'
  this.image_url = obj.volumeInfo.imageLinks ? obj.volumeInfo.imageLinks.thumbnail : 'https://i.imgur.com/J5LVHEL.jpeg'
  this.isbn = obj.volumeInfo.industryIndentifiers ? obj.volumeInfo.industryIndentifiers[0].indentifier : ''
}

Book.lookupBook = (book) => {
  // SQL query
  // superagent req.
}
Book.prototype = {
  // Save in psql database
}
// Localhost listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))


// Book Constructor

function Book(obj){
  this.title = obj.volumeInfo.title ? obj.volumeInfo.title : 'No Title Available';
  this.author = obj.volumeInfo.authors ? obj.volumeInfo.authors.join(',') : 'Unknown'; 
  this.discription = obj.volumeInfo.discription ? obj.volumeInfo.discription : 'No discription available';
  this.image_url = obj.volumeInfo.imageLinks.thumbnail ? obj.volumeInfo.imageLinks.thumbnail : '';
  this.isbn = obj.volumeInfo.industryIndentifiers ? obj.volumeInfo.industryIndentifiers[0].indentifier : '';
}