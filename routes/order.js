const express = require('express');
const routes = express.Router();
const {createOrder, getAllOrders, getOrder, updateOrder, deleteOrder} = require('../controller/order');

routes.post('/', createOrder);
routes.get('/', getAllOrders);
routes.get('/:id', getOrder);
routes.put('/:id', updateOrder);
routes.delete('/:id', deleteOrder);
module.exports = routes;