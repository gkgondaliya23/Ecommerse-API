const express = require('express');
const routes = express.Router();
const {createFavorites, getAllFavorites, removeFavorites} = require('../controller/favorites');

routes.post('/:userId/:productId', createFavorites);
routes.get('/:userId', getAllFavorites);
routes.delete('/:userId/:productId', removeFavorites);

module.exports = routes;