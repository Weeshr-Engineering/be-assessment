import { Router } from "express";
import { addCategory, updateCategory, deleteCategory } from "../controllers/category.controller";

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
 * /categories/{categoryId}:
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
 *         description: category updated successfully
 *       '404':
 *         description: category not found
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
 *         description: category deleted successfully
 *       '404':
 *         description: category not found
 */
CategoryRoutes.post("/create", addCategory);
CategoryRoutes.put("/:id", updateCategory);
CategoryRoutes.delete("/:id", deleteCategory);

export default CategoryRoutes;