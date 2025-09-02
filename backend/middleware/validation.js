const { check, validationResult } = require('express-validator');

exports.validateBooking = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('phone', 'Phone number is required').not().isEmpty(),
  check('from', 'Origin is required').not().isEmpty(),
  check('to', 'Destination is required').not().isEmpty(),
  check('goodsType', 'Type of goods is required').not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateCompanyInfo = [
  check('name', 'Company name is required').not().isEmpty(),
  check('address', 'Address is required').not().isEmpty(),
  check('phone', 'Phone number is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
