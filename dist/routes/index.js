"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/* GET home page. */
// router.get('/', function (req: Request, res: Response, next: NextFunction) {
//   res.status(200).json({
//     message: "Welcome"
//   });
// });
router.get('/', function (req, res) {
    // res.status(200).json({ message: "Home Page"})
    res.render('index', { title: 'Book Library' });
});
//  router.post('/', loginUser)
router.get('/user/register', function (req, res) {
    res.render('register', { title: 'Register' });
});
// router.get('/user/login', function (req: Request, res: Response) {
//   res.render('index', { title: 'Login' });
// });
exports.default = router;
