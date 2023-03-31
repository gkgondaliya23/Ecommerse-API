const express = require('express');
const routes = express.Router();
const {createProduct, getAllProduct, getProduct, updateProduct, deleteProduct} = require('../controller/product');

routes.post('/', createProduct);
routes.get('/', getAllProduct);
routes.get('/:id', getProduct);
routes.put('/:id', updateProduct);
routes.delete('/:id', deleteProduct);


module.exports = routes;