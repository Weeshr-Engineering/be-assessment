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
const express_1 = __importDefault(require("express"));
const user_1 = require("../controller/user");
const user_2 = __importDefault(require("../model/user"));
const router = express_1.default.Router();
/* GET users listing. */
router.get('/registerUser', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).render('register to begin');
}));
// router.get('/loginUser', async (req:Request, res:Response, next:NextFunction) => {
//   res.status(200).render('login')
// });
router.post('/register', user_1.registerUser);
router.post('/login', user_1.loginUser);
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_2.default.find();
        // attributes: { exclude: ['password'] }
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'server error' });
    }
}));
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_2.default.findById(req.params.id);
        if (users) {
            res.status(200).json(users);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'server error' });
    }
}));
router.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_2.default.findById(req.params.id);
        if (users) {
            yield users.updateOne(req.body);
            res.status(200).json(users);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'server error' });
    }
}));
router.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_2.default.findById(req.params.id);
        if (users) {
            yield users.deleteOne();
            res.status(200).json({ status: "success", message: 'User deleted' });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'server error' });
    }
}));
exports.default = router;
// router.post("/new_book", (req, res, next) => {
//   sequelize.Books.create(req.body).then(function() {
//       res.redirect("/all_books");
//     })
//     .catch(function(err:any) {
//       if (err.name === "SequelizeValidationError") {
//         res.render("./books/new_book", { books: sequelize.Books.build(req.body), errors: err.errors })
//       }
//     });
// });
// import express from 'express';
// import { registerUser, loginUser } from '../controller/user.controller';
// const router = express.Router();
// // Define user routes
// router.post('/register', registerUser);
// router.post('/login', loginUser);
// export default router;
