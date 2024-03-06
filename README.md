# Bookstore API Documentation

## Overview

This RESTful API serves as the backend for a bookstore application. It allows users to manage books, authors, and categories. Each book has a title, author, category, publication year, and ISBN.

### Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Jest (for testing)

### How to Run the Application

1. Clone the repository:

```bash
git clone https://github.com/your-username/bookstore-api.git
cd bookstore-api
```

### Install dependencies:

```bash
npm install
```

### Set up environment variables:

Create a .env file in the root directory and define the following variables:

```bash
PORT=3000
MONGODB_URI=<your-mongodb-uri>
```

### Install dependencies:

```bash
npm start
```

## API Endpoints

### Books

- POST /api/books - Create a new book
- GET /api/books - Get a list of all books
- GET /api/books/:id - Get details of a specific book
- PUT /api/books/:id - Update the details of a book
- DELETE /api/books/:id - Delete a book

### Authors

- POST /api/authors - Create a new author
- GET /api/authors - Get a list of all authors
- GET /api/authors/:id - Get details of a specific author
- PUT /api/authors/:id - Update the details of an author
- DELETE /api/authors/:id - Delete an author

### Categories

- POST /api/categories - Create a new category
- GET /api/categories - Get a list of all categories
- GET /api/categories/:id - Get details of a specific category
- PUT /api/categories/:id - Update the details of a category
- DELETE /api/categories/:id - Delete a category

### Testing

To run the tests use the following command:

`
npm test`
