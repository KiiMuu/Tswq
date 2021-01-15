import express from 'express';
const router = express.Router();

// controllers
import {
    getAllProducts,
    getProduct
} from '../controllers/productController.js';

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

export default router;