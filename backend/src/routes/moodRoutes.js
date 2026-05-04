import express from 'express';
import { getMoods, createMood } from '../controllers/moodController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getMoods).post(protect, createMood);

export default router;
