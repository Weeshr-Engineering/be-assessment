"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_KEY = process.env.JWT_KEY || '';
const requireAuth = (req, res, next) => {
    const token = req.signedCookies.jwt;
    if (!token)
        return res.status(401).json({ message: 'Access denied. No token provided' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_KEY);
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid token');
    }
};
exports.requireAuth = requireAuth;
