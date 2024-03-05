"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = __importDefault(require("./routes/user"));
const database_config_1 = __importDefault(require("./database.config"));
(0, dotenv_1.config)();
database_config_1.default.sync({ alter: true }).then(() => {
    console.log("database synced");
})
    .catch((err) => {
    console.log("failed to sync", err);
});
// const user = {
//   AuthorName: "Barack Obama",
//   email:"mk@gmail.com",
//   password: "yourpassword",
//   PhoneNumber:"4198889999000033",
// books:[
//    {
//       Title: "A Promised Land",
//       datePublished: "2020-0-12T19:0455.455z",
//       Description:  "A Promised Land is a memoir by Barack Obama, the 44th President of the United States from 2009 to 2017. Published on November 17, 2020, it is the first of a planned two-volume series",
//       pageCount: "768",
//       Genre: "autobiography",
//       bookId: "1",
//       Publisher: "Crown"
//   }
// ]
// }
const app = (0, express_1.default)();
// view engine setup
app.set('views', path_1.default.join(__dirname, "..", 'views'));
app.set('view engine', 'pug');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// app.use('/books', authenticate, booksRouter);
app.use('/users', user_1.default);
app.get("/register", (req, res) => {
    res.render("register", { title: 'register' });
});
// app.post("/", (req, res) => {
//   const inputTitle = req.body.Title
//   const inputDatePublished = req.body.datePublished
//   const inputDescription = req.body.Description
//   const inputPageCount = req.body.pageCount
//   const inputGenre = req.body.Genre
//   const inputPublisher = req.body.Publisher
//     books:String.push({
//       Title: inputTitle,
//       datePublished: inputDatePublished,
//       Description: inputDescription,
//       pageCount: inputPageCount,
//       Genre: inputGenre,
//       Publisher: inputPublisher
//     })
//     res.render("index", {
//       user: books
//     })
// })
// app.post('/view', (req, res) => {
//   var requestedTitle = req.body.Title;
//   books.forEach(book => {
//     if (book.Title == requestedTitle){
//       Description = "A Promised Land is a memoir by Barack Obama, the 44th President of the United States from 2009 to 2017. Published on November 17, 2020, it is the first of a planned two-volume series";
//     }
//   })
//   res.render("index",{
//     user: books
//   })
// })
// app.post('/edit', (req, res) => {
//   var requestedTitle = req.body.Title;
//   books.forEach(book => {
//     if (book.Title == requestedTitle){
//       Description = "A Promised Land is a memoir by Barack Obama, the 44th President of the United States from 2009 to 2017. Published on November 17, 2020, it is the first of a planned two-volume series";
//     }
//   })
//   res.render("index",{
//     user: books
//   })
// })
// app.post('/delete', (req, res) => {
//   var requestedTitle = req.body.Title;
//   var j = 0;
//   books.forEach(book => {
//     j = j + 1;
//     if (book.Title == requestedTitle){
//       books.splice((j-1), 1)
//     }
//   })
//   res.render("index", {
//     user: books
//   })
// })
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
// app.listen(3000, (res, req) => {
//   console.log("App is listening on port 3000")
// })
exports.default = app;
