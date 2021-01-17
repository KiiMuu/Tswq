import express from 'express';
const router = express.Router();

// controllers
import {
    signInUser,
    signUpUser,
    getUserProfile,
    updateUserProfile
} from '../controllers/userController.js';

// middlewarea
import { protectRoute } from '../middleware/authMiddleware.js';

// validators
import { runValidation } from '../validators/index.js';
import { signupValidator, signinValidator } from '../validators/auth.js';
import { profileValidator } from '../validators/profile.js';

// @desc    Signup a user
// @route   POST /api/users
// @access  Public
router.post(
    '/', 
    signupValidator, 
    runValidation, 
    signUpUser
);

// @desc    Auth user & get token
// @route   POST /api/users/signin
// @access  Public
router.post(
    '/signin', 
    signinValidator, 
    runValidation, 
    signInUser
);

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protectRoute, getUserProfile);

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put(
    '/profile', 
    protectRoute, 
    profileValidator, 
    runValidation, 
    updateUserProfile
);

export default router;