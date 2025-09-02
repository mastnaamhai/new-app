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
  const { bookingId, vehicleNumber, driverName, freightCharges } = req.body;

  if (!bookingId || !vehicleNumber || !driverName || !freightCharges) {
    return res.status(400).json({ msg: 'Please provide all required details for the LR.' });
  }

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    const lrNumber = await generateLrNumber();

    const newLr = new LorryReceipt({
      booking: bookingId,
      lrNumber,
      vehicleNumber,
      driverName,
      freightCharges,
    });

    const lr = await newLr.save();

    // Optionally, update the booking status
    booking.status = 'In Transit';
    await booking.save();

    res.status(201).json(lr);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
