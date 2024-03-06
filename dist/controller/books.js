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
exports.deleteBook = exports.updateBook = exports.getOneBook = exports.getAllBooks = exports.addNewBook = void 0;
const booksModel_1 = __importDefault(require("../model/booksModel"));
// Create a new book
const addNewBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, publicationYear, ISBN } = req.body;
        if (!title || !author || !publicationYear || !ISBN) {
            return res.status(400).json({
                message: "Kindly provide all required fields",
            });
        }
        const createNewBook = yield booksModel_1.default.create({
            title,
            author,
            publicationYear,
            ISBN,
        });
        res.status(201).json({
            message: "Book added successfully",
            createNewBook,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server error",
            error,
        });
    }
});
exports.addNewBook = addNewBook;
// Get a list of all books
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getBooks = yield booksModel_1.default.findAll();
        return res.status(200).json(getBooks);
    }
    catch (error) {
        res.status(500).json({
            message: "server error",
            error,
        });
    }
});
exports.getAllBooks = getAllBooks;
// Get details of a specific book
const getOneBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getBook = yield booksModel_1.default.findByPk(req.params.id);
        if (!getBook) {
            return res.status(404).json({
                message: "Book not found",
            });
        }
        return res.status(200).json(getBook);
    }
    catch (error) {
        res.status(500).json({
            message: "server error",
            error,
        });
    }
});
exports.getOneBook = getOneBook;
// update details of a book
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.id;
        const updatedBook = req.body;
        const updatedBookDoc = yield booksModel_1.default.update(updatedBook, { where: { bookId } });
        if (!updatedBookDoc) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.status(200).json({
            message: "Book updated successfully",
            updatedBook: updatedBookDoc,
        });
    }
    catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateBook = updateBook;
// Delete a book
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.id;
        const deletedBook = yield booksModel_1.default.destroy({ where: { id: bookId } });
        if (!deletedBook) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.status(200).json("Book deleted successfully");
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteBook = deleteBook;
