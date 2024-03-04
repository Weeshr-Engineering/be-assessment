import express , { Router} from "express";

const router : Router = express.Router();

/**
 ** Create a new book.
 ** Get a list of all books.
 ** Get details of a specific book.
 ** Update the details of a book.
 ** Delete a book.
 */

router.post("/create")
router.get("all")
router.get("/:bookId")
router.put("/update/:bookId")
router.delete("/delete/:bookId")

export default router ;