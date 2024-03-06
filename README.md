
# Project: Bookstore API
## Overview:
Build a RESTful API for a bookstore application using Node.js, Express, and TypeScript. The API should manage books, authors, and categories. Each book has a title, author, category, publication year, and ISBN.
#### Documentation 
-  https://documenter.getpostman.com/view/24016790/2sA2xe5EUp
  
#### Routes:
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

#### INSTALLATION
- To run the Bookstore API and its tests, follow these steps
- git clone https://github.com/Marktech2002/be-assessment.git
- cd be-assessment
- npm install
- set up .env environment variable 
- PORT=5001
- MONGO_URL=
- NODE_ENV=development
- JWT_SECRET=
- ACCESS_TOKEN_SECRET=
- REFRESH_TOKEN_SECRET=
- ACCESS_TOKEN_EXPIRES_IN=
- REFRESH_TOKEN_EXPIRES_IN=
- npm start 

#### TESTING 
- npm test
- 
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

#### Submission Guidelines:
- Fork this repository and commit your code.
- Include a README.md file with instructions on how to run the application and tests.
- Create a pull request with your completed assessment.
