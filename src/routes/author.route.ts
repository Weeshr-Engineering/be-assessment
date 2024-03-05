import { Router } from "express";
import { addAuthor, deleteAuthor, getAuthor, getAuthors, updateAuthor } from "../controllers/author.controller";

const AuthorRoutes = Router();

AuthorRoutes.post("/create", addAuthor);
AuthorRoutes.get("/", getAuthors);
AuthorRoutes.get("/:id", getAuthor);
AuthorRoutes.put("/:id", updateAuthor);
AuthorRoutes.delete("/:id", deleteAuthor);

export default AuthorRoutes;