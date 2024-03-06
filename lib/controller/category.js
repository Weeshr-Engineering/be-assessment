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
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getAllCategories = exports.addNewCategory = void 0;
const categoryModel_1 = __importDefault(require("../model/categoryModel"));
const validation_1 = require("../validation/validation");
// Create a new category
const addNewCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validateCategory = validation_1.categorySchema.parse(req.body);
        const { description, genre } = validateCategory;
        if (!description || !genre) {
            return res.status(400).json({
                message: "Kindly provide all required fields",
            });
        }
        const createNewCategory = yield categoryModel_1.default.create({
            description,
            genre,
        });
        res.status(201).json({
            message: "Well-done! Category added successfully",
            createNewCategory,
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
exports.addNewCategory = addNewCategory;
// Get a list of all categories
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getCategories = yield categoryModel_1.default.findAll();
        return res.status(200).json({ getCategories });
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
exports.getAllCategories = getAllCategories;
// Get one category by id
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const getCategory = yield categoryModel_1.default.findByPk(id);
        if (!getCategory) {
            return res.status(404).json({
                message: "Category not found",
            });
        }
        return res.status(200).json({ getCategory });
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
exports.getCategoryById = getCategoryById;
// Update a category by id
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updatedCategory = yield categoryModel_1.default.update(req.body, {
            where: { id },
        });
        if (!updatedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json({
            message: "Category updated successfully",
            updatedCategory,
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
exports.updateCategory = updateCategory;
// Delete a category by id 
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedCategory = yield categoryModel_1.default.destroy({
            where: { id },
        });
        if (!deletedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json({
            message: "Category deleted successfully",
            deletedCategory,
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
exports.deleteCategory = deleteCategory;
