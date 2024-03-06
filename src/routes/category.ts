// src/routes/categoryRoutes.ts
import express from "express";
import * as categoryController from "../controllers/categoryController";
import { body } from "express-validator";
import { validate } from "../middlewares/validation";

const router = express.Router();

export const validateCategory = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  validate,
];

router.post("/", validateCategory, categoryController.createCategory);
router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategory);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);
// Implement get, getById, update, and delete routes

export default router;
