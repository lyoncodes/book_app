# book_app
**Author**: Michael Lyon <br>
**Version**: 1.0.0 
<!-- (increment the patch/fix version number if you make more commits past your first submission) -->

## Overview
book app allows users to search for books, peruse their descriptions, and store titles on a virtual bookshelf In full functionality, the app is akin to having a personal bookshelf & attendant in the library of Congress. You can just tell the attendant what titles you want, they will go fetch them, tell you the description, and then ask if you'd like to store them on your bookshelf for easy reference.<br><br>
Using this model, the Google Book API will be the library. The bookshelf will be a postgreSQL database hosted on Heroku. The attendant will be node.js.<br><br>
Documentation for the Google Book API can be found here: <br>
https://developers.google.com/books/docs/v1/using#WorkingVolumes<br>

<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for a Code Fellows 301 class. (i.e. What's your problem domain?) -->

## Getting Started
### Start Up:
inspect your node version, then create a repository to grow the following file tree: 


<i>*Note that you will need to run the npm init & npm install commands to create the package.json file required for our dependencies.</i>

create a books.sql file in the root directory to build the following schema: 

CREATE TABLE books (<br>
  id SERIAL PRIMARY KEY,<br>
  author VARCHAR(255),<br>
  title VARCHAR(255),<br>
  isbn VARCHAR(255),<br>
  image_url VARCHAR(500),<br>
  description TEXT,<br>
  bookshelf VARCHAR(500)<br>
);<br>

Using OOP principles, create a js script that includes the following: 
* homepage with a search field
* Constructor functions for newly instantiated books (The function should create an object with properties corresponding to the search fields of the search form. i.e.: title, author, description). 
* results page that displays search results

<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

## Architecture
### <b>Languages:</b>
* Javascript
### <b>Dependencies:</b>
* ejs
* express
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

## Change Log

<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

01-01-2001 4:59pm - Application now has a fully-functional express server, with GET and POST routes for the book resource. -->

## 
    12-29-2018 
           0900 - Application repository & files are complete
           
           0925 - Application is hosted locally on PORT

           1125 - FEATURE 1 COMPLETE
              * Expected: 1 hour
              * Actual: 2 hours
              * Challenges: file path on our <%- includes>

           1130 - FEATURE 2 COMPLETE  
              * Expected: 10 mins
              * Actual: 3 mins
              * Challenges: ejs syntax

           1600 - FEATURE 3 COMPLETE
              * Expected: 2 hours
              * Actual: 2 hours
              * Challenges: cannot read thumbnail of undefined

           1700 - FEATURE 4 IN PROGRESS
## Credits and Collaborations
* Jerome Joff