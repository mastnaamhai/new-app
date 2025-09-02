const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoices');
const auth = require('../middleware/auth');

// @route   GET api/invoices
// @desc    Get all invoices
// @access  Private
router.get('/', auth, invoiceController.getInvoices);

// @route   POST api/invoices
// @desc    Create a new Invoice
// @access  Private
router.post('/', auth, invoiceController.createInvoice);

module.exports = router;
