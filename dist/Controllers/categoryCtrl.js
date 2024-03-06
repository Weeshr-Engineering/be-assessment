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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategory = exports.getCategories = void 0;
const categories_1 = require("../Models/categories");
const mongoose_1 = __importDefault(require("mongoose"));
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const totalCategories = yield categories_1.Category.countDocuments();
        const totalPages = Math.ceil(totalCategories / limit);
        const categories = yield categories_1.Category.find()
            .skip((page - 1) * limit)
            .limit(limit);
        res.status(200).json({
            categories,
            totalPages,
            currentPage: page
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving categories" });
    }
});
exports.getCategories = getCategories;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //mongoose ID validation
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid ID" });
    }
    try {
        let category = yield categories_1.Category.findById(id);
        if (!category)
            return res.status(404).json({ message: 'category with ID not found' });
        res.status(200).send(category);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving category" });
    }
});
exports.getCategory = getCategory;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Joi validation
    const { error } = (0, categories_1.validateCategory)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const { categoryName } = req.body;
    const existingCategory = yield categories_1.Category.findOne({ categoryName });
    if (existingCategory)
        return res.status(400).json({ message: "Category already exists" });
    try {
        const category = yield categories_1.Category.create({ categoryName });
        res.status(200).json({ message: "Category created!" });
    }
    catch (_a) {
        res.status(500).json({ message: "Error creating category" });
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Joi validation
    const { error } = (0, categories_1.validateCategory)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const { id } = req.params;
    //mongoose ID validation
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid ID" });
    }
    try {
        const category = yield categories_1.Category.findByIdAndUpdate(id, Object.assign({}, req.body));
        res.status(200).json({ message: "Category successfully updated!" });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating category" });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //mongoose ID validation
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid ID" });
    }
    try {
        const category = yield categories_1.Category.findByIdAndDelete(id, Object.assign({}, req.body));
        res.status(200).json({ message: "Category successfully deleted!" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting category" });
    }
});
exports.deleteCategory = deleteCategory;
