import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

const addOrder = asyncHandler(async (req, res, next) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		qty,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No order items');

		return;
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			qty,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

		const createdOrder = await order.save();

		res.status(201).json(createdOrder);
	}
});

const getOrder = asyncHandler(async (req, res, next) => {
	const orderId = req.params.id;

	const order = await Order.findById(orderId).populate('user', 'name email');

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

const updateOrderToPaid = asyncHandler(async (req, res, next) => {
	const orderId = req.params.id;

	const order = await Order.findById(orderId);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};

		const updatedOrder = await order.save();

		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

const getUserOrders = asyncHandler(async (req, res, next) => {
	const orders = await Order.find({ user: req.user._id });

	res.json(orders);
});

const getOrders = asyncHandler(async (req, res, next) => {
	const orders = await Order.find({}).populate('user', 'id name');

	res.json(orders);
});

export { addOrder, getOrder, updateOrderToPaid, getUserOrders, getOrders };
