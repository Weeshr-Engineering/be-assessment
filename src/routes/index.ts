import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { loginUser } from '../controller/user';

const router = express.Router();

/* GET home page. */
// router.get('/', function (req: Request, res: Response, next: NextFunction) {
//   res.status(200).json({
//     message: "Welcome"
//   });
// });

router.get('/', function (req: Request, res: Response) {

  // res.status(200).json({ message: "Home Page"})
  res.render('index', { title: 'Book Library' });
});

//  router.post('/', loginUser)

router.get('/user/register', function (req: Request, res: Response) {
  res.render('register', { title: 'Register' });
});

// router.get('/user/login', function (req: Request, res: Response) {
//   res.render('index', { title: 'Login' });
// });

export default router;