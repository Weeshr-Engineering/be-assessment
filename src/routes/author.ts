// src/routes/authorRoutes.ts
import express from "express";
import * as authorController from "../controllers/authorController";
import { validate } from "../middlewares/validation";
import { body } from "express-validator";

const router = express.Router();

//custom validation
export const validateAuthor = [
  body("name").notEmpty().withMessage("Name is required"),
  body("bio").notEmpty().withMessage("Bio is required"),
  validate,
];

router.post("/", validateAuthor, authorController.createAuthor);
router.get("/", authorController.getAuthors);
router.get("/:id", authorController.getAuthor);
router.put("/:id", authorController.updateAuthor);
router.delete("/:id", authorController.deleteAuthor);
// Implement get, getById, update, and delete routes

export default router;
