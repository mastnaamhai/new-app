const express = require('express');
const router = express.Router();
const lrController = require('../controllers/lr');
const auth = require('../middleware/auth');

// @route   POST api/lr
// @desc    Create a new Lorry Receipt
// @access  Private
router.post('/', auth, lrController.createLorryReceipt);

module.exports = router;
