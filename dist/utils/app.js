"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const category_1 = __importDefault(require("../Routes/category"));
const author_1 = __importDefault(require("../Routes/author"));
const book_1 = __importDefault(require("../Routes/book"));
const users_1 = __importDefault(require("../Routes/users"));
const auth_1 = require("../Middleware/auth");
function createServer() {
    const JWT_KEY = process.env.JWT_KEY || '';
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cookie_parser_1.default)(JWT_KEY));
    //Routes
    app.use('/api/category', auth_1.requireAuth, category_1.default);
    app.use('/api/author', auth_1.requireAuth, author_1.default);
    app.use('/api/book', book_1.default);
    app.use('/api/user', users_1.default);
    return app;
}
exports.default = createServer;
