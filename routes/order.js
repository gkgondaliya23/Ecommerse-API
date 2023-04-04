const express = require('express');
const routes = express.Router();
const {createOrder, getAllOrders, getOrder, updateOrder, deleteOrder,getUserOrder} = require('../controller/order');

routes.post('/', createOrder);
routes.get('/', getAllOrders);
routes.get('/user/:id', getUserOrder);
routes.get('/:id', getOrder);
routes.put('/:id', updateOrder);
routes.delete('/:id', deleteOrder);
module.exports = routes;