const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', authController.login);

// @route   POST api/auth/register
// @desc    Register a new admin user (optional, for initial setup)
// @access  Public 
router.post('/register', authController.register);

module.exports = router;
