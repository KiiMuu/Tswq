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

const reveiwProduct = asyncHandler(async (req, res, next) => {
	const { rating, comment } = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		);

		if (alreadyReviewed) {
			res.status(400);
			throw new Error('Product already reviewed');
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};

		product.reviews.push(review);
		product.numReviews = product.reviews.length;

		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;

		await product.save();
		res.status(201).json({ message: 'Review added' });
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
	reveiwProduct,
};
