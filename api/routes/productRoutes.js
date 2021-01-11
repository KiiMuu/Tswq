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
router.get('/', getAllProducts);

// @desc    get single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', getProduct);

export default router;