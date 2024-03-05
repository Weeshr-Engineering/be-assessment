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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_post = exports.signup_post = void 0;
const user_1 = require("../Models/user");
//Handle Errors
const handleErrors = (err) => {
    let errors = { email: '', password: '' };
    // Incorrect email and password during login
    if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered';
    }
    if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect';
    }
    // Duplicate email error
    if (err.code === 11000) {
        errors.email = 'That email is already registered';
        return errors;
    }
    // Validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};
//JWT function 
const maxAge = 1 * 24 * 60 * 60;
const signup_post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Joi validation
    const { error } = (0, user_1.validateUser)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const { name, email, phone, password } = req.body;
    try {
        const user = yield user_1.User.create({ name, email, phone, password });
        const token = user.generateAuthToken();
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            secure: process.env.NODE_ENV === 'production',
            signed: true
        });
        res.send({ user: user._id, name });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
});
exports.signup_post = signup_post;
const login_post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.User.login(email, password);
        if (!user) {
            throw new Error('user validation failed');
        }
        const token = user.generateAuthToken();
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            secure: process.env.NODE_ENV === 'production',
            signed: true
        });
        res.status(200).json({ token, user: user.name });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
});
exports.login_post = login_post;
