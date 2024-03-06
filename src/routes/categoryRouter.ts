import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controller/category";

const router = express.Router();

router.post("/addCategory", addCategory);

router.get("/allCategories", getAllCategories);

router.get("/getCategoryById/:id", getCategoryById);

router.put("/updateCategory/:id", updateCategory);

router.delete("/deleteCategory/:id", deleteCategory);

export default router;
