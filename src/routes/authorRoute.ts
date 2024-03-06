import express, { Router } from "express";
import {
  createAuthor,
  updateAuthorById,
  deleteAuthorById,
  getAuthorById,
  getAllAuthors,
  loginAuthor,
} from "../controllers/authorController";
import { protectAuthor } from "../middleware/authMiddleware";

const router: Router = express.Router();

router.post("/create", createAuthor);
router.post("/login", loginAuthor);
router.get("/all", getAllAuthors);
router.get("/:authorId", getAuthorById);
router.put("/update/:authorId", protectAuthor, updateAuthorById);
router.delete("/delete/:authorId", protectAuthor, deleteAuthorById);

export default router;
