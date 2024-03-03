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
exports.deleteAuthor = exports.updateAuthor = exports.createAuthor = exports.getAuthor = exports.getAuthors = void 0;
const author_1 = require("../Models/author");
const mongoose_1 = __importDefault(require("mongoose"));
const getAuthors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authors = yield author_1.Author.find();
        res.status(200).send(authors);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving Authors" });
    }
});
exports.getAuthors = getAuthors;
const getAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //mongoose ID validation
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "No such product" });
    }
    try {
        let author = yield author_1.Author.findById(id);
        if (!author)
            return res.status(404).json({ message: 'Author with ID not found' });
        res.status(200).send(author);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving Author" });
    }
});
exports.getAuthor = getAuthor;
const createAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName } = req.body;
    //Joi validation
    const { error } = (0, author_1.validateAuthor)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const existingAuthor = yield author_1.Author.findOne({ firstName, lastName });
    if (existingAuthor)
        return res.status(400).json({ message: "Author already exists" });
    try {
        const author = yield author_1.Author.create({ firstName, lastName });
        res.status(200).json({ message: "Author created!" });
    }
    catch (_a) {
        res.status(500).json({ message: "Error creating Author" });
    }
});
exports.createAuthor = createAuthor;
const updateAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Joi validation
    const { error } = (0, author_1.validateAuthor)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const { id } = req.params;
    //mongoose ID validation
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No such product");
    }
    try {
        const author = yield author_1.Author.findByIdAndUpdate(id, Object.assign({}, req.body));
        res.status(200).json({ message: "Author successfully updated!" });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating Author" });
    }
});
exports.updateAuthor = updateAuthor;
const deleteAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //mongoose ID validation
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No such product");
    }
    try {
        const author = yield author_1.Author.findByIdAndDelete(id, Object.assign({}, req.body));
        res.status(200).json({ message: "Author successfully deleted!" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting Author" });
    }
});
exports.deleteAuthor = deleteAuthor;
