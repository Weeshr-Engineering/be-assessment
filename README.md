### Bookstore

This is a bookstore api. The api is built using Node's Expressjs framework using TypeScript for static typing. The api connects data to a MongoDB Atlas instance.

## Books route

- GET
  GET book
  http://localhost:8000/books
  This route makes a get request to the book route and it returns a list of books in the database. The route requires no authentication.

- POST
  POST book
  http://localhost:8000/books
  This route creates a book into the database. It require passing a book object. This data is validated using TypeScript and MongoDB schema validation. Any unexpected data input will throw an error.

  If the operation is successful, it will return a success message and the book data that was created.
  Body raw (json)
  json
  {
  "title": "Beginner JavaScript, Third Edition",
  "author": "Olanrewaju",
  "yearPublished": 2024,
  "isbn": "97815029279509",
  "\_\_v": 0
  }

- PUT
  PUT book
  http://localhost:8000/books/65e844e3ef2b8ed44795b0e5
  This route is used to update data entry in the database. The route expects an object containing the body of the book to update. It also expects the ID of the particular book to be updated.

If successful, the api returns success message, status code '200 OK' and the data acknowledgement.

Body
raw (json)
json
{"author": "Olanrewaju Balogun"}
DELETE
DELETE book
http://localhost:8000/books/:id

Path Variables
id

- GET
  GET book id
  http://localhost:4400/books/:id
  This route gets a specific book based on ID specified.

Path Variables
id
GET
GET root route
http://localhost:8000
This route goes to the roote route. It returns a simple string.
