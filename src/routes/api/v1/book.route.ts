import { Router } from "express";

import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../../../controllers/book.controller";

import { authMiddleware } from "../../../middlewares/auths";

const router = Router();

import {
  bookCreateSchema,
  bookUpdateSchema,
} from "../../../middlewares/validations/book.zod";

import { validationMiddleware } from "../../../middlewares/validator";

router.get("/books", authMiddleware, getBooks);
router.get("/book/:bookId", authMiddleware, getBook);
router.post(
  "/book/",
  authMiddleware,
  validationMiddleware(bookCreateSchema),
  createBook
);
router.put(
  "/book/:bookId",
  authMiddleware,
  validationMiddleware(bookUpdateSchema),
  updateBook
);
router.delete("/book/:bookId", authMiddleware, deleteBook);

module.exports = router;
