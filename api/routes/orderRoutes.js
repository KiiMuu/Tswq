import express from 'express';
const router = express.Router();

// controllers
import {
    addOrder,
    getOrder
} from '../controllers/orderController.js';

// middlewarea
import { protectRoute } from '../middleware/authMiddleware.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', protectRoute, addOrder);

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.get('/:id', protectRoute, getOrder);

export default router;