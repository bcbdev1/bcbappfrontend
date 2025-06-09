// routes/auth.routes.ts

import { Router } from 'express';
import {
  signup,
  login,
  verifyOTP,
  forgotPassword,
  resetPassword
} from '../controllers/auth.controller';


const router = Router();

router.post('/signup',signup);
router.post('/login', login);
router.post('/verify-otp', verifyOTP);
router.post('/forgot-password',  forgotPassword);
router.post('/reset-password', resetPassword);

export default router;