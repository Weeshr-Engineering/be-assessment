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
const express_1 = __importDefault(require("express"));
const books_1 = require("../controller/books");
const books_2 = __importDefault(require("../model/books"));
const middleware_1 = require("../middleware/middleware");
const secret = process.env.secret;
const router = express_1.default.Router();
/* GET users listing. */
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield books_2.default.find({});
        res.status(200).json({ books: book });
        // res.status(200).render("books", { book });
    }
    catch (error) {
        res.status(500).json({ message: 'server error' });
        // res.status(500).render("books", {message: 'server error'})
    }
}));
router.get('/adminBooks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield books_2.default.findById(req.params.id);
        if (book) {
            res.status(200).json(book);
        }
        else {
            res.status(404).json({ message: 'book not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'server error' });
    }
}));
router.post('/adminBooks', middleware_1.authorize, books_1.createBook);
router.put('/adminBooks/:id', middleware_1.authorize, books_1.updateBookById);
router.delete('/adminBooks/:id', middleware_1.authorize, books_1.deleteBook);
exports.default = router;
