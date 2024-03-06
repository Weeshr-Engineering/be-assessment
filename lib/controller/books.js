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
exports.addNewBook = exports.deleteBook = exports.updateBook = exports.getOneBook = exports.getAllBooks = void 0;
const booksModel_1 = __importDefault(require("../model/booksModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorModel_1 = __importDefault(require("../model/authorModel"));
const booksModel_2 = __importDefault(require("../model/booksModel"));
function generateAccessToken(book) {
    const payload = {
        id: book.id,
    };
    const secret = "weeshr";
    const options = { expiresIn: "1h" };
    return jsonwebtoken_1.default.sign(payload, secret, options);
}
// Create a new book
// export const addNewBook = async (req: Request, res: Response) => {
//   try {
//     const { title, author, publicationYear, ISBN } = req.body;
//     if (!title || !author || !publicationYear || !ISBN) {
//       return res.status(400).json({
//         message: "Kindly provide all required fields",
//       });
//     }
//     const authorId = req.body;
//     const categoryId = req.body;
//     const createNewBook = await Books.create({
//       title,
//       author: authorId.id,
//       category: categoryId.id,
//       publicationYear,
//       ISBN,
//     });
//     res.status(201).json({
//       message: "Well-done! Book added successfully",
//       createNewBook,
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       return res.status(500).json({
//         message: "Server error",
//         error: error.message,
//       });
//     }
//     res.status(500).json({
//       message: "Server error",
//       error,
//     });
//   }
// };
// Get a list of all books
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    try {
        const getBooks = yield booksModel_1.default.findAll({ offset, limit });
        const totalBookCount = yield booksModel_1.default.count();
        const pages = Math.ceil(totalBookCount / limit);
        return res.status(200).json({ getBooks, pages, currentPage: page });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: "Server error",
                error: error.message,
            });
        }
        res.status(500).json({
            message: "Server error",
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
        if (error instanceof Error) {
            return res.status(500).json({
                message: "Server error",
                error: error.message,
            });
        }
        res.status(500).json({
            message: "Server error",
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
        const updatedBookDoc = yield booksModel_1.default.update(updatedBook, {
            where: { bookId },
        });
        if (!updatedBookDoc) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.status(200).json({
            message: "Book updated successfully",
            updatedBook: updatedBookDoc,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: "Server error",
                error: error.message,
            });
        }
        res.status(500).json({
            message: "Server error",
            error,
        });
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
const addNewBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        const authorToken = yield authorModel_1.default.findByPk(decodedToken.id);
        if (!authorToken) {
            return res.status(404).json({ message: "Author not found" });
        }
        const { title, author, category, publicationYear, ISBN } = req.body;
        const createNewBook = yield booksModel_2.default.create({
            title,
            author,
            category,
            publicationYear,
            ISBN,
            authorId: author.id,
        });
        const accessToken = generateAccessToken(createNewBook);
        res.status(201).json({
            message: "Book created successfully",
            createNewBook,
            accessToken
        });
    }
    catch (error) {
        console.error("Error adding new book:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
exports.addNewBook = addNewBook;
