import express, { Router } from "express";
import {
  createBook,
  getallBooks,
  getBookById,
  updateBookById,
  deleteBookById,
} from "../controllers/bookController";
import { protectAuthor } from "../middleware/authMiddleware";

const router: Router = express.Router();


router.post("/create", protectAuthor, createBook);
router.get("/all", getallBooks);
router.get("/:bookId", getBookById);
router.put("/update/:bookId", protectAuthor, updateBookById);
router.delete("/delete/:bookId", protectAuthor, deleteBookById);

export default router;
