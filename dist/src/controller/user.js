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
const index_1 = require("../../utilities/index");
const user_1 = require("../model/user");
// import bycrpt from 'bcrypt';
function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, id, authorName, phoneNumber } = req.body;
        let data = (0, index_1.registerValidator)();
        // if(err){
        //     res.status(404).json({
        //         status: "fail",
        //         message: ""
        //     })
        // }
        // const id = Number();
        const newUser = yield user_1.user.create({
            id,
            authorName,
            email,
            password,
            phoneNumber,
        });
        // if(user){
        //     res.status(201).json({
        //         status: "successful",
        //         data:{
        //             user
        //         }
        //     })
        // }
        if (!user_1.user) {
            res.status(404).json({
                status: "user not created",
                message: "invalid details"
            });
        }
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // validate user details
        // if ok, check if the user exist
        // if the user exist, then check if the password is correct
        // if password is correct, login user
    });
}
exports.default = { register };
