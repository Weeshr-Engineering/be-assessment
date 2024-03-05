"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBookById = exports.createBook = void 0;
const books_1 = __importDefault(require("../model/books"));
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { Title, datePublished, Description, pageCount, Genre, Publisher, category, bookId } = req.body;
        // Get the author ID from the authenticated user
        const authorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        // Check if authorId exists (user is authenticated)
        if (!authorId) {
            return res.status(401).json({ status: 'failed', message: 'Unauthorized' });
        }
        const newBook = yield books_1.default.create({
            Title,
            datePublished,
            Description,
            pageCount,
            Genre,
            Publisher,
            category,
            authorId, // Assign the author ID to the book
            bookId,
        });
        if (!newBook) {
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid entry',
            });
        }
        res.status(201).json({
            status: 'success',
            message: 'Book has been uploaded',
            book: newBook, // Return the newly created book
        });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createBook = createBook;
const updateBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateBook = yield books_1.default.findById(req.params.id);
        if (updateBook) {
            yield updateBook.updateOne(req.body);
            res.status(200).json({ message: 'Book updated successfully', book: updateBook });
        }
        else {
            res.status(404).json({ message: 'Book not found' });
            return;
        }
    }
    catch (error) {
        res.status(400).json({ message: 'Internal server error' });
        return;
    }
});
exports.updateBookById = updateBookById;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBook = yield books_1.default.findById(req.params.id);
        if (deletedBook) {
            yield deletedBook.deleteOne();
            res.status(200).json({ message: 'Book deleted successfully', book: deletedBook });
            return;
        }
        else {
            res.status(404).json({ message: 'Book not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteBook = deleteBook;
// import { bookData } from '../utilities/books';
// import { ZodError } from 'zod'; // Import ZodError from zod
// export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const book = await books.findAll();
//     res.status(200).json({ books });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
// export const getBookById = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const book = await books.findByPk(id);
//     if (!book) {
//       res.status(404).json({ message: 'Book not found' });
//       // return;
//     }
//     res.status(200).json({ book });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
//     const validatedData = bookData;
//     const newBook = await books.create(validatedData);
//     res.status(201).json({ message: 'Book created successfully', book: newBook });
//   } catch (error) {
//     if (error instanceof ZodError) {
//       res.status(400).json({ error: error.errors });
//       // return;
//     }
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
// interface AuthRequest extends Request {
//   user?: { id: string };
// }
// export const createBook = async (req: AuthRequest, res: Response) => {
//   // try {
//     const { Title, datePublished, Description, pageCount, Genre, Publisher, authorId, bookId } = req.body;
//     const newbook = books.create({
//       Title,
//       datePublished,
//       Description,
//       pageCount,
//       Genre,
//       Publisher,
//       authorId,
//       bookId
//     });
//     if (!newbook){
//       return res.status(400).json({
//         status: 'failed', message: 'Invalid entry',
//       });
//     }
//     res.status(201).json({status: 'success', message:'book has been uploaded',
//     books: {Title, datePublished, Description, pageCount, Genre, Publisher, authorId, bookId},
//   });
// }
