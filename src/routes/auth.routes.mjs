import { Router } from 'express';
import { register, login, getUserProfile } from '../controllers/auth.controller.mjs';
import { authenticate } from '../middlewares/auth.middleware.mjs';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/profile', authenticate, getUserProfile);

export default router;