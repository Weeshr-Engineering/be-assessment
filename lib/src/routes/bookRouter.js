"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_1 = require("../controller/books");
const router = express_1.default.Router();
router.post("/addNewBook", books_1.addNewBook);
router.get("/allBooks", books_1.getAllBooks);
router.get("/getBookById/:id", books_1.getOneBook);
router.put("/updateBook/:id", books_1.updateBook);
router.delete("/deleteBook/:id", books_1.deleteBook);
exports.default = router;
