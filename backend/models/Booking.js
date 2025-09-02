const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  sender: {
    name: { type: String, required: true },
    gstin: { type: String },
  },
  receiver: {
    name: { type: String, required: true },
    gstin: { type: String },
  },
  pickupAddress: { type: String, required: true },
  dropAddress: { type: String, required: true },
  date: { type: Date, default: Date.now },
  goodsInfo: {
    type: { type: String, required: true },
    weight: { type: Number, required: true },
    dimensions: { type: String },
    value: { type: Number, required: true },
  },
  loadType: {
    type: String,
    enum: ['FTL', 'LTL'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in_pooling', 'dispatched', 'delivered'],
    default: 'pending',
  },
  documents: [{ type: String }], // URLs to uploaded documents
  clientType: {
    type: String,
    enum: ['B2B', 'B2C'],
    required: true,
  },
  invoiceGenerated: { type: Boolean, default: false },
  consignmentNoteGenerated: { type: Boolean, default: false },
});

// Virtual for lorry receipts
BookingSchema.virtual('lorryReceipt', {
  ref: 'LorryReceipt',
  localField: '_id',
  foreignField: 'booking',
  justOne: true,
});

module.exports = mongoose.model('Booking', BookingSchema);
