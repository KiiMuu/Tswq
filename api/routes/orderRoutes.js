import express from 'express';
const router = express.Router();

// controllers
import {
    addOrder
} from '../controllers/orderController.js';

// middlewarea
import { protectRoute } from '../middleware/authMiddleware.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', protectRoute, addOrder);

export default router;