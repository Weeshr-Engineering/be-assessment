"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categories_1 = require("../controller/categories");
const router = express_1.default.Router();
router.post('/create', categories_1.createCategory);
router.get('/', categories_1.getCategories);
router.get('/:id', categories_1.getCategoryById);
router.put('/:id', categories_1.updateCategoryById);
router.delete('/:id', categories_1.deleteCategory);
exports.default = router;
