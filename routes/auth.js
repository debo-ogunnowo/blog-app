const express = require('express');
const router = express.Router();
const { createUser, loginUser, renderLogin, renderSignup } = require('../controllers/auth');

router.route('/login').get(renderLogin).post(loginUser);
router.route('/signup').get(renderSignup).post(createUser);

module.exports = router