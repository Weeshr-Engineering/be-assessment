"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/* GET users listing. */
router.get("/test", (req, res, next) => {
    res.send('here is my book router');
});
router.get("/", (req, res, next) => {
    res.render('books', { name: 'myBook' });
});
router.get("/books/test", (req, res, next) => {
    res.send('here is my child book router');
});
router.post("/books/test", (req, res, next) => {
    const allRequest = req.body;
    res.json({ data: allRequest });
});
exports.default = router;
