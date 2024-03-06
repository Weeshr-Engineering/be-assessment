import { Router } from "express";
import { addCategory, updateCategory, deleteCategory } from "../controllers/category.controller";
import { validationMiddleware } from "../validations";
import { categoryCreateSchema, categoryUpdateSchema } from "../validations/category.validation";

const CategoryRoutes = Router();

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
 *         name:
 *           type: string
 *           description: The name of the category
 */

/**
 * @swagger
 * /categories/:
 *   post:
 *     summary: Create new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       '200':
 *         description: Category created
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Category'
 *   get:
 *     summary: Retrieve all categories
 *     tags: [Categories]
 *     responses:
 *       '200':
 *         description: Categories fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 * /categories/{categoryId}:
 *   get:
 *     summary: Get an category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the category to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Category fetched
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '404':
 *         description: Category Not Found
 *   put:
 *     summary: Update an category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the category to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/category'
 *     responses:
 *       '200':
 *         description: Category Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '404':
 *         description: Category Not Found
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Category Deleted
 *       '404':
 *         description: Category Not Found
 */
CategoryRoutes.post("/create", validationMiddleware(categoryCreateSchema), addCategory);
CategoryRoutes.put("/:id", validationMiddleware(categoryUpdateSchema), updateCategory);
CategoryRoutes.delete("/:id", deleteCategory);

export default CategoryRoutes;