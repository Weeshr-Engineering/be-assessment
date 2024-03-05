import { Router } from 'express';
const router = Router();
import { signup_post, login_post } from '../Controllers/userCtrl';

router.post('/signup', signup_post)
router.post('/login', login_post)

export default router;