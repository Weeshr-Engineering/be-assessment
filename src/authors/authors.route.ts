import { Express } from "express";
import * as authorsController from "./authors.controller";

function authorRoutes(app: Express) {
  // get all authors
  app.get("/authors", authorsController.getAllAuthors);

  // get one author
  app.get("/authors/:id", authorsController.getOneAuthor);

  // post a author
  app.post("/authors", authorsController.createAuthor);

  // put/update a author
  app.put("/authors", authorsController.updateAuthor);

  // delete an author
  app.delete("/authors/:id", authorsController.deleteAuthor);
}

export default authorRoutes;
