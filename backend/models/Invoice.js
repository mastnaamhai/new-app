const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
  },
  billingDetails: {
    name: { type: String, required: true },
    address: { type: String, required: true },
  },
  gstAmount: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Unpaid'],
    default: 'Unpaid',
  },
  paymentDate: {
    type: Date,
  },
  paymentMode: {
    type: String,
  },
  paymentNotes: {
    type: String,
  },
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
