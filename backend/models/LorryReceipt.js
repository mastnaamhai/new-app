const mongoose = require('mongoose');

const LorryReceiptSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
  lrNumber: {
    type: String,
    required: true,
    unique: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
  driverName: {
    type: String,
    required: true,
  },
  freightCharges: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('LorryReceipt', LorryReceiptSchema);
