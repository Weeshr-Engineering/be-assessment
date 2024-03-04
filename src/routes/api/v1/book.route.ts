import { Router } from "express";

import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../../../controllers/book.controller";

import { authMiddleware } from "../../../middlewares/auths";

const router = Router();

import {
  bookCreateSchema,
  bookUpdateSchema,
} from "../../../middlewares/validations/book.zod";

import { validationMiddleware } from "../../../middlewares/validator";

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API endpoints for managing books
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           $ref: '#/components/schemas/Author'
 *         publication_year:
 *           type: string
 *           format: date
 *           description: The publication year of the book
 *         isbn:
 *           type: string
 *           description: The ISBN of the book
 *         authorId:
 *           type: integer
 *           format: int64
 *           description: The ID of the author associated with the book
 *         categoryId:
 *           type: integer
 *           format: int64
 *           description: The ID of the category associated with the book
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve all books
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get("/books", authMiddleware, getBooks);

/**
 * @swagger
 * /book/{bookId}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         description: ID of the book to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Book found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       '404':
 *         description: Book not found
 */
router.get("/book/:bookId", authMiddleware, getBook);

/**
 * @swagger
 * /book/:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       '201':
 *         description: Book created successfully
 *       '400':
 *         description: Bad request, invalid data supplied
 */

router.post(
  "/book/",
  authMiddleware,
  validationMiddleware(bookCreateSchema),
  createBook
);

/**
 * @swagger
 * /book/{bookId}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         description: ID of the book to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       '200':
 *         description: Book updated successfully
 *       '404':
 *         description: Book not found
 */

router.put(
  "/book/:bookId",
  authMiddleware,
  validationMiddleware(bookUpdateSchema),
  updateBook
);

/**
 * @swagger
 * /book/{bookId}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         description: ID of the book to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Book deleted successfully
 *       '404':
 *         description: Book not found
 */

router.delete("/book/:bookId", authMiddleware, deleteBook);

module.exports = router;
