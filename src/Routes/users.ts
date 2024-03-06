import { Router } from 'express';
const router = Router();
import { signup_post, login_post, logout_get } from '../Controllers/userCtrl';

router.post('/signup', signup_post)
router.post('/login', login_post)
router.get('/logout', logout_get)

export default router;