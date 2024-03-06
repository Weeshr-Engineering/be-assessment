# Project: Bookstore API

## Overview:

Build a RESTful API for a bookstore application using Node.js, Express, and TypeScript. The API should manage books, authors, and categories. Each book has a title, author, category, publication year, and ISBN.

## Requirements:

### Setup:

- Initialize a new Node.js project using npm or yarn.
- Use TypeScript for your project.

#### Express Setup:

Set up an Express application with appropriate middleware.
Include middleware for JSON parsing and logging.

#### Routes:

Create routes for the following CRUD operations:

##### Books:

- Create a new book.
- Get a list of all books.
- Get details of a specific book.
- Update the details of a book.
- Delete a book.

##### Authors:

- Create a new author.
- Get a list of all authors.
- Get details of a specific author.
- Update the details of an author.
- Delete an author.

##### Categories:

- Create a new category.
- Get a list of all categories.
- Get details of a specific category.
- Update the details of a category.
- Delete a category.

#### Data Storage:

- Use an in-memory array or a simple database (e.g., MongoDB or MySQL) to store books, authors, and categories.
- Implement appropriate relationships between books, authors, and categories.

#### Validation:

- Validate the input data for creating and updating books, authors, and categories.
- Include appropriate error handling and return meaningful error messages.

#### Testing:

Write unit tests for at least two routes using a testing framework of your choice (Jest, Mocha, etc.).

#### Documentation:

- Provide clear documentation on how to run your application and tests.
- Include a brief overview of the project structure and any important design decisions.
- Use Postman to document your endpoints

#### Bonus Points:

- Implement sorting and filtering options for the list of books, authors, and categories.
- Add pagination for the list endpoints.
- Include user authentication middleware.

#### Submission Guidelines:

- Fork this repository and commit your code.
- Include a README.md file with instructions on how to run the application and tests.
- Create a pull request with your completed assessment.

## Weeshr - Bookstore API

This Node.js and Express.js bookstore API, built with TypeScript, empowers bookstore management through a RESTful interface." (Focuses on functionalities).

## Features

CRUD Operations: Create, read, update, and delete book entries.

Express Middleware: Middleware to efficiently process incoming requests and tailored responses.

TypeScript: TypeScript for robust static typing, ensuring code clarity and reducing runtime errors.

Error Handling: Implement robust error handling mechanisms to guarantee API reliability.

API Documentation: Detailed documentation through each API endpoint, its purpose and usage.

## Requirements

Node.js
Express
TypeScript
Yarn
SQLite
Sequelize

## Installation.

Set up the environment by:
. running `yarn` and initialized it by running `yarn init`.
.installed Express using `npx express-generator`
.installed all dependencies and dev-dependencies using `yarn add`.

## Usage

The server is kept on watch by running `yarn build` and it is started by running `yarn start`.

# Access the API.

# for author:

http://localhost:4000/users/addAuthor - to create authors
http://localhost:4000/users/allAuthors - to get all authors
http://localhost:4000/users/getAuthorById/:id - to get a specific author
http://localhost:4000/users/updateAuthor/:id - to update authors
http://localhost:4000/users/deleteAuthor/:id - to delete authors

# for books:

http://localhost:4000/books/addNewBook - to create books
http://localhost:4000/books/allBooks - to get all books
http://localhost:4000/books/getBookById/:id - to get a specific book
http://localhost:4000/books/updateBook/:id - to update books
http://localhost:4000/books/deleteBook/:id - to delete books

# for category:

http://localhost:4000/categories/addCategory - to create categories
http://localhost:4000/categories/allCategories - to get all categories
http://localhost:4000/categories/getCategoryById/:id - to get a specific category
http://localhost:4000/categories/updateCategory/:id - to update categories
http://localhost:4000/categories/deleteCategory/:id - to delete categories

## Environment Variables

PORT: Port number for the server (default port is 3000).
secret: jwt secret

## Testing

Logic to test the endpoints - `yarn test`
