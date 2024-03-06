import express from "express";
import {
  addNewAuthor,
  getAllAuthors,
  getSpecificAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controller/author";

const router = express.Router();

router.post("/addAuthor", addNewAuthor);

router.get("/allAuthors", getAllAuthors);

router.get("/getAuthorById/:id", getSpecificAuthor);

router.put("/updateAuthor/:id", updateAuthor);

router.delete("/deleteAuthor/:id", deleteAuthor);

export default router;
