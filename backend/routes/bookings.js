const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookings');
const auth = require('../middleware/auth');

// @route   POST api/bookings
// @desc    Create a new booking
// @access  Public
router.post('/', bookingController.createBooking);

// @route   GET api/bookings
// @desc    Get all bookings
// @access  Private
router.get('/', auth, bookingController.getBookings);

// @route   PUT api/bookings/:id
// @desc    Update booking status
// @access  Private
router.put('/:id', auth, bookingController.updateBookingStatus);

module.exports = router;
