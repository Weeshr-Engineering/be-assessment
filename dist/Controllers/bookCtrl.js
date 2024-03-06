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
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBook = exports.getBooks = void 0;
const books_1 = require("../Models/books");
const mongoose_1 = __importDefault(require("mongoose"));
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || null;
    try {
        let query = books_1.Book.find().populate(['author', 'category']).skip((page - 1) * limit).limit(limit);
        if (sortBy === 'title') {
            query = query.sort({ 'title': 1 });
        }
        const totalBooks = yield books_1.Book.countDocuments();
        const totalPages = Math.ceil(totalBooks / limit);
        const books = yield query;
        res.status(200).json({
            books,
            currentPage: page,
            totalPages
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving Books" });
    }
});
exports.getBooks = getBooks;
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //mongoose ID validation
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid ID" });
    }
    try {
        let book = yield books_1.Book.findById(id).populate(['author', 'category']);
        if (!book)
            return res.status(404).json({ message: 'Book with ID not found' });
        res.status(200).send(book);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving Book" });
    }
});
exports.getBook = getBook;
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Joi validation
    const { error } = (0, books_1.validateBook)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const { title, author, category, publicationYear, isbn } = req.body;
    const existingBook = yield books_1.Book.findOne({ title, author, category, publicationYear, isbn });
    if (existingBook)
        return res.status(400).json({ message: "Book already exists" });
    try {
        const book = yield books_1.Book.create({ title, author, category, publicationYear, isbn });
        res.status(200).json({ message: "Book created!" });
    }
    catch (_a) {
        res.status(500).json({ message: "Error creating Book" });
    }
});
exports.createBook = createBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Joi validation
    const { error } = (0, books_1.validateBook)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const { id } = req.params;
    //mongoose ID validation
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid ID" });
    }
    try {
        const book = yield books_1.Book.findByIdAndUpdate(id, Object.assign({}, req.body));
        res.status(200).json({ message: "Book successfully updated!" });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating Book" });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //mongoose ID validation
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid ID" });
    }
    try {
        const book = yield books_1.Book.findByIdAndDelete(id, Object.assign({}, req.body));
        res.status(200).json({ message: "Book successfully deleted!" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting Book" });
    }
});
exports.deleteBook = deleteBook;
