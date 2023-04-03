const express = require('express');
const { verifyToken } = require('./verifyToken');
const routes = express.Router();
const {updateUser, deleteUser} = require('../controller/user');

routes.put('/:id', verifyToken, updateUser);


routes.delete('/:id', deleteUser);


module.exports = routes;