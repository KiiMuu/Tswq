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

const deleteProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();

		res.json({ message: 'Product removed successfully' });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

const createProduct = asyncHandler(async (req, res, next) => {
	const product = new Product({
		name: 'sn',
		price: 0,
		user: req.user._id,
		image: '/images/smaple.jpg',
		brand: 'smapleBrand',
		category: 'sample cat',
		countInStock: 0,
		numReviews: 0,
		description: 'sample desc',
	});

	const createdProduct = await product.save();

	res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res, next) => {
	const {
		name,
		price,
		description,
		image,
		brand,
		category,
		countInStock,
	} = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;

		const updatedProduct = await product.save();

		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

export {
	getAllProducts,
	getProduct,
	deleteProduct,
	createProduct,
	updateProduct,
};
