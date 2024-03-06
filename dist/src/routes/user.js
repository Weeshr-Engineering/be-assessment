"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
    console.log(process.env);
    res.send('respond with a resource');
});
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
exports.default = router;
