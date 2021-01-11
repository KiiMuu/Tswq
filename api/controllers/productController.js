import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const getAllProducts = asyncHandler(async (req, res, next) => {
    const products = await Product.find({});

    res.json(products);
});

const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export { getAllProducts, getProduct }