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
exports.deleteCategory = exports.updateCategoryById = exports.getCategoryById = exports.getCategories = exports.createCategory = void 0;
const categories_1 = __importDefault(require("../model/categories"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryName, categoryDetails } = req.body;
        const newCategory = new categories_1.default({
            categoryName,
            categoryDetails,
        });
        const savedCategory = yield newCategory.save();
        res.status(201).json({
            status: 'success',
            message: 'Category created successfully',
            category: savedCategory,
        });
    }
    catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createCategory = createCategory;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categories_1.default.find({});
        res.status(200).json({ categories });
    }
    catch (error) {
        console.error('Error getting categories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getCategories = getCategories;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.id;
        const category = yield categories_1.default.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ category });
    }
    catch (error) {
        console.error('Error getting category by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getCategoryById = getCategoryById;
const updateCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.id;
        const { categoryName, categoryDetails } = req.body;
        const updatedCategory = yield categories_1.default.findByIdAndUpdate(categoryId, { categoryName, categoryDetails }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
    }
    catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateCategoryById = updateCategoryById;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.id;
        const deletedCategory = yield categories_1.default.findOneAndDelete({ _id: categoryId });
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully', category: deletedCategory });
    }
    catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteCategory = deleteCategory;
