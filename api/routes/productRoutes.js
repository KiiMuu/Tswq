import express from 'express';
const router = express.Router();

// controllers
import {
	getAllProducts,
	getProduct,
	deleteProduct,
	createProduct,
	updateProduct,
	reveiwProduct,
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

// @desc    Create product
// @route   POST /api/products
// @access  Priavte/Admin
router.post('/', protectRoute, adminAuth, createProduct);

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Priavte/Admin
router.put('/:id', protectRoute, adminAuth, updateProduct);

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Priavte
router.post('/:id/reviews', protectRoute, reveiwProduct);

export default router;
