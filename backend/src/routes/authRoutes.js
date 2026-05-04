import express from 'express';
import { registerUser, authUser, getUserProfile, googleLogin } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', authUser);
router.post('/google', googleLogin);
router.get('/me', protect, getUserProfile);

export default router;
