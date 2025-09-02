const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoices');
const auth = require('../middleware/auth');

// @route   GET api/invoices
// @desc    Get all invoices
// @access  Private
router.get('/', auth, invoiceController.getInvoices);

// @route   GET api/invoices/:id
// @desc    Get invoice by ID
// @access  Private
router.get('/:id', auth, invoiceController.getInvoiceById);

// @route   POST api/invoices
// @desc    Create a new Invoice
// @access  Private
router.post('/', auth, invoiceController.createInvoice);

// @route   PUT api/invoices/:id/payment
// @desc    Mark an invoice as paid
// @access  Private
router.put('/:id/payment', auth, invoiceController.markAsPaid);

module.exports = router;
