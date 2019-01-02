'use strict'
// Application Dependencies
const express = require('express')
const pg = require('pg')
const superagent = require('superagent')

require ('dotenv').config()

// Applicatoin Setup
const app = express()
const PORT = process.env.PORT || 3000

// Parse request.body
app.use(express.urlencoded({extended: true}))
app.use(express.static('./public'))

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL)
client.connect()
client.on('error', err => console.error(err))

// Set the view engine for server-side templating
app.set('view engine', 'ejs')



// Search Route
app.get('/', home);
app.get('/books/:id', renderBook);
app.post('/book', saveBook);
app.get('/new', newSearch);

app.post('/searches', search);

// Home Route
function home(req, res){
  const SQL = 'SELECT * FROM books';

  return client.query(SQL)
    .then(data => {
      res.render('pages/index', {books: data.rows});
    })
    .catch(err => {
      console.log(err);
      res.render('pages/error', {err});
    });
}

function newSearch(req, res){
  res.render('pages/searches/new.ejs');
}


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
      console.log(books)
      res.render('pages/searches/show', {books})
    })
}


function renderBook(req,res){
  let SQL = `SELECT * FROM books WHERE id=$1`;
  let values = [req.params.id];
  return client.query(SQL, values)
    .then(result => {
      console.log('Retrieve from DB');
      res.render('pages/books/show', {book: result.rows[0]});
    })
    .catch(err => handleError(err, res));
}

// Save Books
function saveBook(req, res){
  let SQL = `INSERT INTO books
  (author, title, isbn, image_url, description,bookshelf)
  VALUES($1,$2,$3,$4,$5,$6)`;
  let values = (SQL, [req.body.author, req.body.title, req.body.isbn, req.body.image_url, req.body.description, req.body.bookshelf]);

  return client.query(SQL, values)
    .then(result => {
      let SQL = 'SELECT id FROM books WHERE isbn=$1';
      let values = [req.body.isbn];

  return client.query(SQL, values)
      .then(result => {
        res.redirect(`/books/${result.rows[0].id}`);
      })
      .catch(err => handleError(err, res));
    })
    .catch(err => handleError(err, res));
}



// Book Constructor
function Book (obj) {
  console.log(obj)
  this.title = obj.volumeInfo.title ? obj.volumeInfo.title : 'No Title Available'
  this.author = obj.volumeInfo.authors ? obj.volumeInfo.authors.join(',') : 'Unknown'
  this.description = obj.volumeInfo.description ? obj.volumeInfo.description : 'No description available'
  this.image_url = obj.volumeInfo.imageLinks ? obj.volumeInfo.imageLinks.thumbnail : 'https://i.imgur.com/J5LVHEL.jpeg'
  this.isbn = obj.volumeInfo.industryIndentifiers ? obj.volumeInfo.industryIndentifiers[0].indentifier : 'ISBN not provided'
}

//Error handle
function handleError(err, res) {
  console.log(err);
  if (res) res.status(500).render('pages/error');
}


// Localhost listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
