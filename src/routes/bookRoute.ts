import express , { Router} from "express";
import { createBook , getallBooks , getBookById , updateBookById, deleteBookById } from "../controllers/bookController";

const router : Router = express.Router();

/**
 ** Create a new book.
 ** Get a list of all books.
 ** Get details of a specific book.
 ** Update the details of a book.
 ** Delete a book.
 */

router.post("/create" , createBook)
router.get("all" ,getallBooks)
router.get("/:bookId" ,getBookById)
router.put("/update/:bookId" ,updateBookById )
router.delete("/delete/:bookId" , deleteBookById)

export default router ;