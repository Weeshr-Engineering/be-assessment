"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const author_1 = require("../controller/author");
const router = express_1.default.Router();
/* Add new Author */
router.post('/addNewAuthor', author_1.addNewAuthor);
router.get('/allAuthors', author_1.getAllAuthors);
router.get('/getAuthorById/id', author_1.getSpecificAuthor);
router.put('/updateAuthor', author_1.updateAuthor);
router.delete('/deleteAuthor', author_1.deleteAuthor);
exports.default = router;
