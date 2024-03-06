import express from "express";
import {
  addNewBook,
  getAllBooks,
  getOneBook,
  updateBook,
  deleteBook,
} from "../controller/books";

const router = express.Router();

router.post("/addNewBook", addNewBook);

router.get("/allBooks", getAllBooks);

router.get("/getBookById/:id", getOneBook);

router.put("/updateBook/:id", updateBook);

router.delete("/deleteBook/:id", deleteBook);

export default router;
