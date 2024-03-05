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
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../model/user"));
// import { userData } from '../utilities/user';
// import { string } from 'zod';
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.secret;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, authorName, email, phoneNumber } = req.body;
        const password = req.body.password;
        const existingUser = yield user_1.default.findOne({ where: { email } });
        console.log(existingUser);
        if (existingUser) {
            res.status(400).json({ message: 'Email is already registered' });
            return;
        }
        // password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        console.log(hashedPassword);
        const newUser = yield user_1.default.create({
            id,
            authorName,
            email,
            password: hashedPassword,
            phoneNumber
        });
        console.log(newUser);
        console.log(password);
        if (!newUser) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        // res.status(201).json({ message: 'User registered successfully', user: newUser });
        res.redirect('/index');
    }
    catch (error) {
        res.status(500).json({ error: 'not working' });
        return;
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const User = yield user_1.default.findOne({ email });
        console.log(User);
        // Check if user exists
        if (!User) {
            res.status(404).json({ status: 'failed', message: 'User not found' });
            return;
        }
        // Compare the provided password with the hashed password in the database
        const passwordMatch = bcryptjs_1.default.compareSync(password, User.password);
        if (passwordMatch) {
            // Passwords match, generate JWT token
            const secret = process.env.secret;
            const token = jsonwebtoken_1.default.sign({
                loginkey: User.id,
            }, secret, { expiresIn: '1h' });
            res.status(200).json({ status: 'successful', message: 'Login successful', token: token });
        }
        else {
            // Passwords do not match
            res.status(401).json({ status: 'failed', message: 'Invalid password' });
        }
    }
    catch (error) {
        // Log any errors that occur during the process
        console.error('Login Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.loginUser = loginUser;
