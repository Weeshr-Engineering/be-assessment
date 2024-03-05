"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const category_1 = __importDefault(require("./Routes/category"));
const author_1 = __importDefault(require("./Routes/author"));
const book_1 = __importDefault(require("./Routes/book"));
const users_1 = __importDefault(require("./Routes/users"));
const auth_1 = require("./Middleware/auth");
dotenv_1.default.config();
const JWT_KEY = process.env.JWT_KEY || '';
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)(JWT_KEY));
//Connecting to database
const MONGO_URI = process.env.MONGO_URI || '';
const PORT = parseInt(process.env.PORT || '3000');
mongoose_1.default.connect(MONGO_URI)
    .then(() => {
    app.listen(PORT, () => { console.log('Listening on port', process.env.PORT); });
})
    .catch((error) => console.log(error));
//logger
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
//Routes
app.use('/api/category', auth_1.requireAuth, category_1.default);
app.use('/api/author', auth_1.requireAuth, author_1.default);
app.use('/api/book', auth_1.requireAuth, book_1.default);
app.use('/api/user', users_1.default);
