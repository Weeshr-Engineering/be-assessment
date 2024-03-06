import { Router } from "express";
import { addBook, getBooks, getBook, updateBook, deleteBook } from "../controllers/book.controller";
import { validationMiddleware } from "../validations";
import { bookCreateSchema, bookUpdateSchema } from "../validations/book.validation";

const BookRoutes = Router();

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
 *           type: string
 *           description: The reference to the author
 *         description:
 *           type: string
 *           description: The description of the book
 *         category:
 *           type: string
 *           description: The category of the book
 *         publicationYear:
 *           type: number
 *           description: The publication year
 *         isbn:
 *           type: string
 *           description: The ISBN of the book
 */

/**
 * @swagger
 * /books/:
 *   post:
 *     summary: Create new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       '200':
 *         description: Book created
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Book'
 *   get:
 *     summary: Retrieve all books
 *     tags: [Books]
 *     responses:
 *       '200':
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 * /books/{bookId}:
 *   get:
 *     summary: Get an book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         description: ID of the book to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Book found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       '404':
 *         description: Book not found
 *   put:
 *     summary: Update an book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         description: ID of the book to update
 *         schema:
 *           type: string
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
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         description: ID of the book to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Book deleted successfully
 *       '404':
 *         description: Book not found
 */
BookRoutes.post("/create", validationMiddleware(bookCreateSchema), addBook);
BookRoutes.get("/", getBooks);
BookRoutes.get("/:id", getBook);
BookRoutes.put("/:id", validationMiddleware(bookUpdateSchema), updateBook);
BookRoutes.delete("/:id", deleteBook);

export default BookRoutes;