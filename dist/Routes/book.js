"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const bookCtrl_1 = require("../Controllers/bookCtrl");
const auth_1 = require("../Middleware/auth");
//GET all Books
router.get('/', bookCtrl_1.getBooks);
//GET one Book
router.get('/:id', bookCtrl_1.getBook);
//POST Book
router.post('/', auth_1.requireAuth, bookCtrl_1.createBook);
//DELETE one Book
router.delete('/:id', auth_1.requireAuth, bookCtrl_1.deleteBook);
//UPDATE one Book
router.put('/:id', auth_1.requireAuth, bookCtrl_1.updateBook);
exports.default = router;
