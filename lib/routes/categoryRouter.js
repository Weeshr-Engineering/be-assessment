"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_1 = require("../controller/category");
const router = express_1.default.Router();
router.post("/addCategory", category_1.addNewCategory);
router.get("/allCategories", category_1.getAllCategories);
router.get("/getCategoryById/:id", category_1.getCategoryById);
router.put("/updateCategory/:id", category_1.updateCategory);
router.delete("/deleteCategory/:id", category_1.deleteCategory);
exports.default = router;
