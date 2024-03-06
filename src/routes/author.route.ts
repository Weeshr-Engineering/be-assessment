import { Router } from "express";
import { addAuthor, deleteAuthor, getAuthor, getAuthors, updateAuthor } from "../controllers/author.controller";

const AuthorRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: API endpoints for managing authors
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the author
 *         lastName:
 *           type: string
 *           description: The last name of the author
 *         middleName:
 *           type: string
 *           format: password
 *           description: The middle name of the author
 */

/**
 * @swagger
 * /authors/:
 *   post:
 *     summary: Create new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       '200':
 *         description: Author created
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Author'
 *   get:
 *     summary: Retrieve all authors
 *     tags: [Authors]
 *     responses:
 *       '200':
 *         description: Authors fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 * /authors/{authorId}:
 *   get:
 *     summary: Get an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         description: ID of the author to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Author fetched
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       '404':
 *         description: Author Not Found
 *   put:
 *     summary: Update an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         description: ID of the author to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       '200':
 *         description: Author updated successfully
 *       '404':
 *         description: Author Not Found
 *   delete:
 *     summary: Delete an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         description: ID of the author to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Author deleted
 *       '404':
 *         description: Author Not Found
 */
AuthorRoutes.post("/create", addAuthor);
AuthorRoutes.get("/", getAuthors);
AuthorRoutes.get("/:id", getAuthor);
AuthorRoutes.put("/:id", updateAuthor);
AuthorRoutes.delete("/:id", deleteAuthor);

export default AuthorRoutes;