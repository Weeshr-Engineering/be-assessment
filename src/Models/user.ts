import Joi from "joi";
import mongoose from "mongoose";
import { isEmail } from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

const JWT_KEY: string = process.env.JWT_KEY || '';

const userSchema = new mongoose.Schema({
    name : {
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
        validate: [isEmail, 'Please enter email']
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
})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.generateAuthToken = function() {
    const maxAge = 1 * 24 * 60 * 60
    const token = jwt.sign({ _id: this._id }, JWT_KEY, {expiresIn: maxAge});
    return token;
}

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        } throw Error('incorrect password');
    } throw Error('incorrect email')
}

const User = mongoose.model('User', userSchema);

interface UserInput {
    name: string;
    email: string;
    phone: string;
    password: string;
}

function validateUser(user: UserInput) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(20).required(),
        email: Joi.string().required().email(),
        phone: Joi.string().min(10).max(15).required(),
        password: Joi.string().min(5).max(1024).required()
    }) 
    return schema.validate(user)
}