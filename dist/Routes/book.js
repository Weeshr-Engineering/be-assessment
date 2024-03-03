"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const bookCtrl_1 = require("../Controllers/bookCtrl");
//GET all Books
router.get('/', bookCtrl_1.getBooks);
//GET one Book
router.get('/:id', bookCtrl_1.getBook);
//POST Book
router.post('/', bookCtrl_1.createBook);
//DELETE one Book
router.delete('/:id', bookCtrl_1.deleteBook);
//UPDATE one Book
router.put('/:id', bookCtrl_1.updateBook);
exports.default = router;
