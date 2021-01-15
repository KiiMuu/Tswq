import express from 'express';
const router = express.Router();

// controllers
import {
    authUser
} from '../controllers/userController.js';

// @desc    Auth user & get token
// @route   POST /api/users/signin
// @access  Public
router.post('/signin', authUser);

export default router;