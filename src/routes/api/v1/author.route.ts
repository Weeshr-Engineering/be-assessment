import { Router } from "express";
import {
  createAuthor,
  deleteAuthor,
  login,
  getAuthor,
  getAuthors,
  updateAuthor,
} from "../../../controllers/author.controller";

import { authMiddleware } from "../../../middlewares/auths";

const router = Router();

import {
  authorCreateSchema,
  authorUpdateSchema,
  loginSchema,
} from "../../../middlewares/validations/author.zod";

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
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the author
 *         fullname:
 *           type: string
 *           description: The full name of the author
 *         password:
 *           type: string
 *           format: password
 *           description: The password of the author
 *         bio:
 *           type: string
 *           description: The biography of the author (optional)
 */

/**
 * @swagger
 * /authors/:
 *   get:
 *     summary: Retrieve all authors
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       '201':
 *         description: Author created successfully
 *       '400':
 *         description: Bad request, invalid data supplied
 *
 * /authors/{authorId}:
 *   get:
 *     summary: Get an author by ID
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         description: ID of the author to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Author found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       '404':
 *         description: Author not found
 *   put:
 *     summary: Update an author by ID
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
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
 *         description: Author not found
 *   delete:
 *     summary: Delete an author by ID
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         description: ID of the author to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Author deleted successfully
 *       '404':
 *         description: Author not found
 */

import { validationMiddleware } from "../../../middlewares/validator";

router.get("/authors/", authMiddleware, getAuthors);

router.get("/author/:authorId", authMiddleware, getAuthor);
router.post(
  "/register",
  validationMiddleware(authorCreateSchema),
  createAuthor
);

router.put(
  "/author/:authorId",
  authMiddleware,
  validationMiddleware(authorUpdateSchema),
  updateAuthor
);

router.delete("/author/:authorId", authMiddleware, deleteAuthor);

router.post("/login", validationMiddleware(loginSchema), login);

router.get("/logout", (req, res) => {
  req.destroy();
  res.redirect("/");
});

module.exports = router;
