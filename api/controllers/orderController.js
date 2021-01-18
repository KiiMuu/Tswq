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
        totalPrice
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
            totalPrice
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

export { addOrder, getOrder }