"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCategory = exports.Category = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const categorySchema = new mongoose_1.default.Schema({
    categoryName: {
        type: String,
        minlength: 5,
        required: true
    }
});
const Category = mongoose_1.default.model('Category', categorySchema);
exports.Category = Category;
// Joi validator
function validateCategory(category) {
    const schema = joi_1.default.object({
        categoryName: joi_1.default.string().min(5).required()
    });
    return schema.validate(category);
}
exports.validateCategory = validateCategory;
