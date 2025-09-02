const LorryReceipt = require('../models/LorryReceipt');
const Booking = require('../models/Booking');

// A simple function to generate a unique LR number
const generateLrNumber = async () => {
  const lastLR = await LorryReceipt.findOne().sort({ date: -1 });
  if (lastLR && lastLR.lrNumber) {
    const lastNumber = parseInt(lastLR.lrNumber.split('-')[1]);
    return `LR-${lastNumber + 1}`;
  }
  return 'LR-1001';
};

exports.createLorryReceipt = async (req, res) => {
  const {
    bookingId,
    vehicleNumber,
    driverName,
    eWayBillNumber,
    goodsDetails,
    freightPaymentTerm,
    gstOnFreight,
  } = req.body;

  // Basic validation
  if (
    !bookingId ||
    !vehicleNumber ||
    !driverName ||
    !goodsDetails ||
    !freightPaymentTerm ||
    !gstOnFreight
  ) {
    return res.status(400).json({ msg: 'Please provide all required LR details.' });
  }

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    if (booking.consignmentNoteGenerated) {
      return res.status(400).json({ msg: 'LR already generated for this booking.' });
    }

    const lrNumber = await generateLrNumber();

    const newLr = new LorryReceipt({
      booking: bookingId,
      lrNumber,
      vehicleNumber,
      driverName,
      consignorGstin: booking.sender.gstin, // Get GSTIN from booking
      consigneeGstin: booking.receiver.gstin, // Get GSTIN from booking
      eWayBillNumber,
      goodsDetails,
      freightPaymentTerm,
      gstOnFreight,
    });

    const lr = await newLr.save();

    // Update booking status and mark LR as generated
    booking.status = 'dispatched';
    booking.consignmentNoteGenerated = true;
    await booking.save();

    res.status(201).json(lr);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
