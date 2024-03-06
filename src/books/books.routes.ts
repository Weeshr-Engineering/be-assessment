import { Express } from "express";
import * as booksController from "./books.controller";

function bookRoutes(app: Express) {
  // get all books
  app.get("/books", booksController.getAllBooks);

  // get one book
  app.get("/books/:id", booksController.getOneBook);

  // post a book
  app.post("/books", booksController.createBook);

  // put/update a book
  app.put("/books/:id", booksController.updateBook);

  // delete a book
  app.delete("/books/:id", booksController.deleteBook);
}

export default bookRoutes;
