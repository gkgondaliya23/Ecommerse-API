const OrderItems = require('../model/orderItems');
const Order = require('../model/orderModel');
const Product = require('../model/productModel');
const User = require('../model/usersModel');

exports.createOrder = async (req, res) => {
    try {
        const orderItemId = Promise.all(
            req.body.orderItems.map(async (orderitem) => {
                let neworderitemId = new OrderItems({
                    product: orderitem.product,
                    quntity: orderitem.quntity
                })
                neworderitemId = await neworderitemId.save();
                return neworderitemId._id;
            }))

        const orderItemsIds = await orderItemId;
        const totalPrices = await Promise.all(
            orderItemsIds.map(async (orderitemId) => {
                const orderItem = await OrderItems.findById(orderitemId).populate(
                    "product",
                    "price"
                );
                const totalPrice = orderItem.product.price * orderItem.quntity;
                return totalPrice;
            })
        );
        const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
        let order = new Order({
            user: req.body.user,
            orderItems: orderItemsIds,
            totalPrice: totalPrice,
        });

        order = await order.save();
        res.status(201).json({ Details: order._doc });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};



exports.getAllOrders = async (req, res) => {
    try {
        const allOrder = await Order.find({}).populate({
            path: 'user',
            select: 'name email phone',
        })
            .populate({
                path: 'orderItems',
                populate: {
                    path: 'product',
                    select: "title price category",
                }
            })
            .sort({ dateOrderd: -1 });
        res.status(200).json(allOrder);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getOrder = async (req, res) => {
    try {
        const getOrder = await Order.findById(req.params.id).populate({
            path: "user",
            select: "name email"
        })
            .populate({
                path: "orderItems",
                populate: {
                    path: "product",
                    select: "title price category",
                }
            });
        res.status(200).json(getOrder);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const itemId = Promise.all(
            req.body.orderItems.map(async (orderitem) => {
                let newOrderItem = new OrderItems({
                    product: orderitem.product,
                    quntity: orderitem.quntity,
                })
                newOrderItem = await newOrderItem.save();
                return newOrderItem._id;
            })
        );
        const itemsIds = await itemId;
        const totalprices = await Promise.all(
            itemsIds.map(async (oderItemId) => {
                const item = await OrderItems.findById(oderItemId).populate(
                    {
                        path: 'product',
                        select: 'price'
                    }
                );
                const totalPrice = item.product.price * item.quntity;
                return totalPrice;
            })
        );
        const totalprice = totalprices.reduce((a, b) => a + b, 0);
        const getOrder = await Order.findOneAndUpdate({ _id: req.params.id },
            {

                user: req.body.user,
                orderItems: itemsIds,
                totalPrice: totalprice
            },
            { new: true });
        res.status(200).json(getOrder);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const getOrder = await Order.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(getOrder);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};