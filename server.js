'use strict'
// Application Dependencies
const express = require('express')
const pg = require('pg')

// Applicatoin Setup
const app = express()
const PORT = process.env.PORT || 3000

// Parse request.body
app.use(express.urlencoded({extended: true}))

// Database Setup
const client = new pg.Client('postgres://localhost:5432/books_app')
client.connect()
client.on('error', err => console.error(err))

// Set the view engine for server-side templating
app.set('view engine', 'ejs')

// Routes
// Home Route
app.get('/', (req, res) => {
  res.render('pages/index')
})

// Localhost listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
