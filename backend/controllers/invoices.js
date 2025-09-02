const Invoice = require('../models/Invoice');
const Booking = require('../models/Booking');

// A simple function to generate a unique invoice number
const generateInvoiceNumber = async () => {
  const lastInvoice = await Invoice.findOne().sort({ date: -1 });
  if (lastInvoice && lastInvoice.invoiceNumber) {
    const lastNumber = parseInt(lastInvoice.invoiceNumber.split('-')[1]);
    return `INV-${lastNumber + 1}`;
  }
  return 'INV-2001';
};

exports.createInvoice = async (req, res) => {
  const { bookingId, billingDetails, gstAmount, totalAmount } = req.body;

  if (!bookingId || !billingDetails || !gstAmount || !totalAmount) {
    return res.status(400).json({ msg: 'Please provide all required details for the invoice.' });
  }

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    // Ensure booking is delivered before creating an invoice
    if (booking.status !== 'Delivered') {
      return res.status(400).json({ msg: 'Invoice can only be generated for delivered bookings.' });
    }

    const invoiceNumber = await generateInvoiceNumber();

    const newInvoice = new Invoice({
      booking: bookingId,
      invoiceNumber,
      billingDetails,
      gstAmount,
      totalAmount,
    });

    const invoice = await newInvoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
