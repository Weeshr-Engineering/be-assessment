import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auths";

import {
  categoryCreateSchema,
  categoryUpdateSchema,
} from "../../../middlewares/validations/category.zod";

import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../../../controllers/category.controller";

const router = Router();
import { validationMiddleware } from "../../../middlewares/validator";

router.get("/categories", authMiddleware, getCategories);

router.get("/category/:categoryId", authMiddleware, getCategory);

router.post(
  "/category/",
  authMiddleware,
  validationMiddleware(categoryCreateSchema),
  createCategory
);

router.put(
  "/category/:categoryId",
  authMiddleware,
  validationMiddleware(categoryUpdateSchema),
  updateCategory
);

router.delete("/category/:categoryId", authMiddleware, deleteCategory);

module.exports = router;
