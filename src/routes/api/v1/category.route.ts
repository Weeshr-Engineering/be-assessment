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

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API endpoints for managing categories
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The auto-generated ID of the category
 *         name:
 *           type: string
 *           description: The name of the category
 *         tags:
 *           type: string
 *           description: Tags related to the category
 *         Book:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Book'
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The auto-generated ID of the category
 *         name:
 *           type: string
 *           description: The name of the category
 *         tags:
 *           type: string
 *           description: Tags related to the category
 *         Book:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Book'
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Retrieve all categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get("/categories", authMiddleware, getCategories);

/**
 * @swagger
 * /category/{categoryId}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the category to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Category found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '404':
 *         description: Category not found
 */
router.get("/category/:categoryId", authMiddleware, getCategory);
/**
 * @swagger
 * /category/:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       '201':
 *         description: Category created successfully
 *       '400':
 *         description: Bad request, invalid data supplied
 */
router.post(
  "/category/",
  authMiddleware,
  validationMiddleware(categoryCreateSchema),
  createCategory
);

/**
 * @swagger
 * /category/{categoryId}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the category to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       '200':
 *         description: Category updated successfully
 *       '404':
 *         description: Category not found
 */

router.put(
  "/category/:categoryId",
  authMiddleware,
  validationMiddleware(categoryUpdateSchema),
  updateCategory
);

/**
 * @swagger
 * /category/{categoryId}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Category deleted successfully
 *       '404':
 *         description: Category not found
 */
router.delete("/category/:categoryId", authMiddleware, deleteCategory);

module.exports = router;
