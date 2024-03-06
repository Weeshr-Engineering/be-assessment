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
exports.deleteAuthor = exports.updateAuthor = exports.getSpecificAuthor = exports.getAllAuthors = exports.addNewAuthor = void 0;
const authorModel_1 = __importDefault(require("../model/authorModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validation_1 = require("../validation/validation");
function generateAccessToken(author) {
    const payload = {
        email: author.email,
        id: author.id,
    };
    const secret = "weeshr";
    const options = { expiresIn: "1h" };
    return jsonwebtoken_1.default.sign(payload, secret, options);
}
// Create a new author
const addNewAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validateAuthor = validation_1.authorSchema.parse(req.body);
        const { fullName, email, password, confirmPassword } = validateAuthor;
        const existingAuthor = yield authorModel_1.default.findOne({ where: { email } });
        if (existingAuthor) {
            return res.status(400).json({
                message: "Author already exists. Try again!",
            });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match",
            });
        }
        const hashedpassword = yield bcrypt_1.default.hash(password, 10);
        if (!fullName || !email || !password || !confirmPassword) {
            return res.status(400).json({
                message: "Kindly provide all required fields",
            });
        }
        const createNewAuthor = yield authorModel_1.default.create({
            fullName,
            email,
            password: hashedpassword,
            confirmPassword: hashedpassword,
        });
        const accessToken = generateAccessToken(createNewAuthor);
        res.status(201).json({
            message: "Welcome! Author.",
            createNewAuthor,
            accessToken,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                message: "Invalid request data",
                error: error.message,
            });
        }
        else {
            return res.status(500).json({
                message: "Server error",
                error,
            });
        }
    }
});
exports.addNewAuthor = addNewAuthor;
// Get all authors
const getAllAuthors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authors = yield authorModel_1.default.findAll();
        console.log(authors);
        const authorDetails = authors.map((author) => ({
            id: author.id,
            fullName: author.fullName,
            email: author.email,
        }));
        res.status(200).json({
            message: "All authors gotten successfully!",
            authors: authorDetails,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
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
exports.getAllAuthors = getAllAuthors;
// Get a specific author
const getSpecificAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const author = yield authorModel_1.default.findByPk(req.params.id);
        if (!author) {
            return res.status(404).json({
                message: "Author not found",
            });
        }
        res.status(200).json({
            message: "welcome back!",
            author,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
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
exports.getSpecificAuthor = getSpecificAuthor;
// Update an author details
const updateAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorUpdate = yield authorModel_1.default.findByPk(req.params.id);
        if (!authorUpdate) {
            return res.status(404).json({
                message: "Author not found",
            });
        }
        yield authorModel_1.default.update(req.body, { where: { id: req.params.id } });
        res.status(200).json({
            message: "Author details updated successfully!",
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
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
exports.updateAuthor = updateAuthor;
// Delete an author
const deleteAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorDelete = yield authorModel_1.default.findByPk(req.params.id);
        if (!authorDelete) {
            return res.status(404).json({
                message: "Author not found",
            });
        }
        yield authorModel_1.default.destroy({ where: { id: req.params.id } });
        res.status(200).json({
            message: "Author deleted successfully!",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server error",
            error,
        });
    }
});
exports.deleteAuthor = deleteAuthor;
