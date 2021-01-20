import express from 'express';
const router = express.Router();

// controllers
import {
	getAllProducts,
	getProduct,
	deleteProduct,
} from '../controllers/productController.js';

// middlewarea
import { protectRoute, adminAuth } from '../middleware/authMiddleware.js';

// @desc    get all products
// @route   GET /api/products
// @access  Public
// router.get('/', getAllProducts);
router.route('/').get(getAllProducts);

// @desc    get single product
// @route   GET /api/products/:id
// @access  Public
// router.get('/:id', getProduct);
router.route('/:id').get(getProduct);

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Priavte/Admin
router.delete('/:id', protectRoute, adminAuth, deleteProduct);

export default router;
