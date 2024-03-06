"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const categoryCtrl_1 = require("../Controllers/categoryCtrl");
//GET all Categories
router.get('/', categoryCtrl_1.getCategories);
//GET one Category
router.get('/:id', categoryCtrl_1.getCategory);
//POST Category
router.post('/', categoryCtrl_1.createCategory);
//DELETE one Category
router.delete('/:id', categoryCtrl_1.deleteCategory);
//UPDATE one Category
router.put('/:id', categoryCtrl_1.updateCategory);
exports.default = router;
