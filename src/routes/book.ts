import express from "express";
import { body } from "express-validator";
import { validate } from "../middlewares/validation";
import * as bookController from "../controllers/bookController";
const router = express.Router();

//custom validation
export const validateBook = [
  body("title").notEmpty().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("publicationYear")
    .isInt({ min: 0 })
    .withMessage("Invalid publication year"),
  body("ISBN").notEmpty().withMessage("ISBN is required"),
  validate,
];
router.post("/", validateBook, bookController.createBook);
router.get("/", bookController.getBooks);
router.get("/:id", bookController.getBook);
router.get("/:id", bookController.getBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);
export default router;
