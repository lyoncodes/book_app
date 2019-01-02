-- Run schema
-- psql books_app -f books.sql 

-- Push db to heroku
-- heroku pg:push books_app DATABASE_URL --app ad-nc-booklist



DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  author VARCHAR(255),
  title VARCHAR(255),
  isbn VARCHAR(255),
  image_url VARCHAR(500),
  description TEXT,
  bookshelf VARCHAR(500)
);


INSERT INTO books(author, title, isbn, image_url, description, bookshelf)
  values('Z.B. Zabinsky', 'Stochastic Adaptive Search for Global Optimization', '9781402075261', 'http://books.google.com/books/content?id=gr7Ug5In4sgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'The field of global optimization has been developing at a rapid pace', 'Computers');

  INSERT INTO books(author, title, isbn, image_url, description, bookshelf)
  values('Zong Woo Geem', 'Music-Inspired Harmony Search Algorithm', '9783642001840', 'http://books.google.com/books/content?id=B11q4S2Ls0wC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'Calculus has been used in solving many scientific and engineering problems.', 'Mathematics');