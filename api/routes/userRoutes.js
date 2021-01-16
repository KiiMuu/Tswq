import express from 'express';
const router = express.Router();

// controllers
import {
    signInUser,
    signUpUser,
    getUserProfile
} from '../controllers/userController.js';

// middlewarea
import { protectRoute } from '../middleware/authMiddleware.js';

// @desc    Auth user & get token
// @route   POST /api/users/signin
// @access  Public
router.post('/signin', signInUser);

// @desc    Signup a user
// @route   POST /api/users
// @access  Public
router.post('/', signUpUser);

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protectRoute, getUserProfile);

export default router;