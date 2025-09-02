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
  date: {
    type: Date,
    default: Date.now,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
  driverName: {
    type: String,
    required: true,
  },
  consignorGstin: { type: String },
  consigneeGstin: { type: String },
  eWayBillNumber: { type: String },
  goodsDetails: {
    weight: { type: String, required: true },
    packageCount: { type: Number, required: true },
    hsnCode: { type: String },
  },
  freightPaymentTerm: {
    type: String,
    required: true,
    enum: ['Paid', 'To Pay', 'To be Billed'],
  },
  gstOnFreight: {
    rate: { type: Number, required: true },
    baseAmount: { type: Number, required: true },
    cgst: { type: Number, default: 0 },
    sgst: { type: Number, default: 0 },
    igst: { type: Number, default: 0 },
    totalFreight: { type: Number, required: true },
  },
});

module.exports = mongoose.model('LorryReceipt', LorryReceiptSchema);
