import express, { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} from "../controllers/categorieController";

const router: Router = express.Router();

router.post("/create", createCategory);
router.get("/all", getAllCategories);
router.get("/:categoryId", getCategoryById);
router.put("/update/:categoryId", updateCategoryById);
router.delete("/delete/:categoryId", deleteCategoryById);

export default router;
