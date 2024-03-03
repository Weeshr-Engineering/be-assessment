"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuthor = exports.Author = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const authorSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        minlength: 3,
        required: true
    },
    lastName: {
        type: String,
        minlength: 3,
        required: true
    }
});
const Author = mongoose_1.default.model('Author', authorSchema);
exports.Author = Author;
// Joi validator
function validateAuthor(author) {
    const schema = joi_1.default.object({
        firstName: joi_1.default.string().min(3).required(),
        lastName: joi_1.default.string().min(3).required()
    });
    return schema.validate(author);
}
exports.validateAuthor = validateAuthor;
