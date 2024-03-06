"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const authorCtrl_1 = require("../Controllers/authorCtrl");
//GET all Authors
router.get('/', authorCtrl_1.getAuthors);
//GET one Author
router.get('/:id', authorCtrl_1.getAuthor);
//POST Author
router.post('/', authorCtrl_1.createAuthor);
//DELETE one Author
router.delete('/:id', authorCtrl_1.deleteAuthor);
//UPDATE one Author
router.put('/:id', authorCtrl_1.updateAuthor);
exports.default = router;
