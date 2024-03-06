
# Project: Bookstore API
# CRUD Operations API Documentation

This documentation outlines CRUD (Create, Read, Update, Delete) operations for managing Books, Authors, and Categories in MongoDB.

## Getting Started

To start the application, run the following command:

```
npm run dev
```

## Code Structure

```
project-root
│   app.ts
│   server.ts
│
└─── model
│   │   books.ts
│   │   author.ts
│   │   categories.ts
│   │   user.ts
│   
└─── controller
│   │   bookCtrl.ts
│   │   authorCtrl.ts
│   │   categoryCtrl.ts
│   │   userCtrl.ts
│
└─── routes
    │   book.ts
    │   author.ts
    │   category.ts
    │   users.ts

In the `model` folder, you'll find all schemas and models. The `controller` folder contains route logic. <br>The `routes` folder contains route files for each endpoint. <BR>These route files are exported into `app.ts`, where the app is initialized. <BR>Finally, `app.ts` is exported to `server.ts`, which is the root file of the application.
```

## Authentication

### Login

**Endpoint:** `POST /api/user/login`

**Request Body:**
- email (String, required)
- password (String, required)

**Response:**
Upon successful login, a cookie is created which allows the user to access routes with authorization.

## Books

### Create a New Book

**Endpoint:** `POST /api/book`

### Get a List of All Books

**Endpoint:** `GET /api/book`

**Query Parameters:**
- page (optional): Page number for pagination
- limit (optional): Number of items per page
- title (optional): Filter by title


### Get Details of a Specific Book

**Endpoint:** `GET /api/book/:id`

### Update the Details of a Book

**Endpoint:** `PUT /api/book/:id`

### Delete a Book

**Endpoint:** `DELETE /api/book/:id`

## Authors

### Create a New Author

**Endpoint:** `POST /api/author`

### Get a List of All Authors

**Endpoint:** `GET /api/author`

**Query Parameters:**
- page (optional): Page number for pagination
- limit (optional): Number of items per page

### Get Details of a Specific Author

**Endpoint:** `GET /api/author/:id`

### Update the Details of an Author

**Endpoint:** `PUT /api/author/:id`

### Delete an Author

**Endpoint:** `DELETE /api/author/:id`

## Categories

### Create a New Category

**Endpoint:** `POST /api/category`

### Get a List of All Categories

**Endpoint:** `GET /api/category`

**Query Parameters:**
- page (optional): Page number for pagination
- limit (optional): Number of items per page

### Get Details of a Specific Category

**Endpoint:** `GET /api/category/:id`

### Update the Details of a Category

**Endpoint:** `PUT /api/category/:id`

### Delete a Category

**Endpoint:** `DELETE /api/category/:id`


## Find POSTMAN documentation HERE
https://documenter.getpostman.com/view/30504924/2sA2xe5Edf
