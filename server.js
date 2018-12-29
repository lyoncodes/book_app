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

function handleError(res, error) {
  console.log(error);
  res.render('pages/error', {err: error})
}

// Search Route
app.post('/searches', searchBooks)

function searchBooks(req, res) {
  let URL = `https://www.googleapis.com/books/v1/volumes?q=`;
  let searchStr = req.body.search[0]
  let  searchType = req.body.search[1]

  // if (req.body.search[1] === 'title') URL += `+intitle:${req.body.search[0]}&key=${process.env.PORT}`;
  // if (req.body.search[1] === 'author') URL += `+intitle:${req.body.search[0]}&key=${process.env.PORT}`;

  // Search Type conditionals
  if (searchType === 'title') {
    URL += `+intitle:${searchStr}`
  } else if (searchType === 'author') {
    URL += `inauthor:${searchStr}`
  }
  superagent.get(URL)
    .then(result => {
      let books = result.body.items.map(book => new Book(book))
      if(result.body.items) {
        for(var i = 0; i <=10; i++){
          books.push(new Book(result.body.items[i]))
        }

        res.render('pages/searches/show', {books})
      } else {
        handleError(res);
      }
    })
    .catch(err => handleError(res, req));
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