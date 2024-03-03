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
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = require("validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_KEY = process.env.JWT_KEY || '';
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 20,
        required: [true, 'Please enter a name']
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255,
        validate: [validator_1.isEmail, 'Please enter email']
    },
    phone: {
        type: String,
        minlength: 10,
        maxlength: 15,
        required: [true, 'Please enter a phone number']
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: [true, 'Please enter a password']
    },
    isAdmin: {
        type: Boolean
    }
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt();
        this.password = yield bcrypt_1.default.hash(this.password, salt);
        next();
    });
});
userSchema.methods.generateAuthToken = function () {
    const maxAge = 1 * 24 * 60 * 60;
    const token = jsonwebtoken_1.default.sign({ _id: this._id }, JWT_KEY, { expiresIn: maxAge });
    return token;
};
userSchema.statics.login = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ email });
        if (user) {
            const auth = yield bcrypt_1.default.compare(password, user.password);
            if (auth) {
                return user;
            }
            throw Error('incorrect password');
        }
        throw Error('incorrect email');
    });
};
const User = mongoose_1.default.model('User', userSchema);
function validateUser(user) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(5).max(20).required(),
        email: joi_1.default.string().required().email(),
        phone: joi_1.default.string().min(10).max(15).required(),
        password: joi_1.default.string().min(5).max(1024).required()
    });
    return schema.validate(user);
}
