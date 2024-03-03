"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBook = exports.Book = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const bookSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        minlength: 5,
        required: true
    },
    author: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Author',
            required: true
        }],
    category: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        }],
    publicationYear: {
        type: Date,
        required: true
    },
    isbn: {
        type: String,
        min: 10,
        max: 13,
        required: true,
        unique: true
    }
});
const Book = mongoose_1.default.model('Book', bookSchema);
exports.Book = Book;
// Joi validator
function validateBook(book) {
    const schema = joi_1.default.object({
        title: joi_1.default.string().min(5).required(),
        author: joi_1.default.array().required(),
        category: joi_1.default.array().required(),
        publicationYear: joi_1.default.date().required(),
        isbn: joi_1.default.string().min(10).max(13).required()
    });
    return schema.validate(book);
}
exports.validateBook = validateBook;
