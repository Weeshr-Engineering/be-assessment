import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoryCtry";

const router = express.Router();

router.route("/").get(getCategories);

router.route("/create").post(createCategory);

router.route("/:category_id").get(getCategory);

router.route("/:category_id/update").put(updateCategory);

router.route("/:category_id/delete").delete(deleteCategory);

export default router;
