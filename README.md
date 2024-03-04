# Bookstore API

a RESTful API for a bookstore application using Node.js, Express, and TypeScript. The API should manage books, authors, and categories. Each book has a title, author, category, publication year, and ISBN.

## Folder Structure

```
|--- prisma
|--- src
|    |--- controllers
|    |---
|    |--- interfaces
|    |--- middlewares
|    |--- routes
|    |--- services
|    |--- utils
|    |--- swagger.ts
|    |--- server.ts
|--- .env
|--- app.ts
|--- .gitignore
|--- package.json
|--- tsconfig.json
```

## Dependencies

- Node.js
- TypeScript
- Express
- ts-node-dev

## Database Schema

The database schema can be found at: [Database Schema](https://dbdocs.io/hiibeekayvibe/Book-API)

## Getting Started

- Edit the .env file to suit your needs
- Run `npm run start:dev` to start the development server
- Run `npm run start` to start the production server
- Visit `http://localhost:3000/api/v1/greetings` to see the result

## API Endpoints Documentation

Api Documentation can be found at: [API Documentation](https:///api-docs/)

### Base URL

All endpoints are prefixed with `/api/v1/`.

### Categories

#### `GET /categories`

- **Description:** Retrieve all categories.
- **Security:** Requires bearer authentication.
- **Responses:**
  - `200`: A list of categories.

#### `GET /category/{categoryId}`

- **Description:** Get a category by ID.
- **Security:** Requires bearer authentication.
- **Parameters:** `categoryId` - ID of the category to retrieve.
- **Responses:**
  - `200`: Category found.
  - `404`: Category not found.

#### `POST /category/`

- **Description:** Create a new category.
- **Security:** Requires bearer authentication.
- **Body:** Category object.
- **Responses:**
  - `201`: Category created successfully.
  - `400`: Bad request, invalid data supplied.

#### `PUT /category/{categoryId}`

- **Description:** Update a category by ID.
- **Security:** Requires bearer authentication.
- **Parameters:** `categoryId` - ID of the category to update.
- **Body:** Updated Category object.
- **Responses:**
  - `200`: Category updated successfully.
  - `404`: Category not found.

#### `DELETE /category/{categoryId}`

- **Description:** Delete a category by ID.
- **Security:** Requires bearer authentication.
- **Parameters:** `categoryId` - ID of the category to delete.
- **Responses:**
  - `204`: Category deleted successfully.
  - `404`: Category not found.

### Books

#### `GET /books`

- **Description:** Retrieve all books.
- **Security:** Requires bearer authentication.
- **Responses:**
  - `200`: A list of books.

#### `GET /book/{bookId}`

- **Description:** Get a book by ID.
- **Security:** Requires bearer authentication.
- **Parameters:** `bookId` - ID of the book to retrieve.
- **Responses:**
  - `200`: Book found.
  - `404`: Book not found.

#### `POST /book/`

- **Description:** Create a new book.
- **Security:** Requires bearer authentication.
- **Body:** Book object.
- **Responses:**
  - `201`: Book created successfully.
  - `400`: Bad request, invalid data supplied.

#### `PUT /book/{bookId}`

- **Description:** Update a book by ID.
- **Security:** Requires bearer authentication.
- **Parameters:** `bookId` - ID of the book to update.
- **Body:** Updated Book object.
- **Responses:**
  - `200`: Book updated successfully.
  - `404`: Book not found.

#### `DELETE /book/{bookId}`

- **Description:** Delete a book by ID.
- **Security:** Requires bearer authentication.
- **Parameters:** `bookId` - ID of the book to delete.
- **Responses:**
  - `204`: Book deleted successfully.
  - `404`: Book not found.

### Authors

#### `GET /authors/`

- **Description:** Retrieve all authors.
- **Security:** Requires bearer authentication.
- **Responses:**
  - `200`: A list of authors.

#### `GET /author/{authorId}`

- **Description:** Get an author by ID.
- **Security:** Requires bearer authentication.
- **Parameters:** `authorId` - ID of the author to retrieve.
- **Responses:**
  - `200`: Author found.
  - `404`: Author not found.

#### `POST /register`

- **Description:** Create/Register a new author.
- **Body:** Author object.
- **Responses:**
  - `201`: Author created successfully.
  - `400`: Bad request, invalid data supplied.

#### `PUT /author/{authorId}`

- **Description:** Update an author by ID.
- **Security:** Requires bearer authentication.
- **Parameters:** `authorId` - ID of the author to update.
- **Body:** Updated Author object.
- **Responses:**
  - `200`: Author updated successfully.
  - `404`: Author not found.

#### `DELETE /author/{authorId}`

- **Description:** Delete an author by ID.
- **Security:** Requires bearer authentication.
- **Parameters:** `authorId` - ID of the author to delete.
- **Responses:**
  - `204`: Author deleted successfully.
  - `404`: Author not found.

### Authentication

#### `POST /login`

- **Description:** Login an author.
- **Body:** Credentials object.
- **Responses:**
  - `200`: Login successful.
  - `400`: Invalid credentials.

#### `GET /logout`

- **Description:** Logout an author.
- **Responses:**
  - `200`: Logout successful.
