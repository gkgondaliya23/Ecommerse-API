const express = require('express');
const routes = express.Router();
const {registerAuth, loginAuth} = require('../controller/auth');

routes.post('/register', registerAuth);

routes.post('/login', loginAuth);

module.exports = routes;
