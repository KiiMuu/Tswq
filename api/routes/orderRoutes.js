import express from 'express';
const router = express.Router();

// controllers
import {
	addOrder,
	getOrder,
	getUserOrders,
	updateOrderToPaid,
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

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
router.put('/:id/pay', protectRoute, updateOrderToPaid);

// @desc    Get user orders
// @route   GET /api/orders/myorders
// @access  Private
router.get('/myorders', protectRoute, getUserOrders);

export default router;
