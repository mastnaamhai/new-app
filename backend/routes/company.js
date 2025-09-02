const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company');
const auth = require('../middleware/auth');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 }, // 1MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'), false);
    }
  },
});

// @route   GET api/company
// @desc    Get company information
// @access  Public
router.get('/', companyController.getCompanyInfo);

const { validateCompanyInfo } = require('../middleware/validation');

// @route   PUT api/company
// @desc    Update company information
// @access  Private
router.put('/', auth, validateCompanyInfo, companyController.updateCompanyInfo);

// @route   POST api/company/logo
// @desc    Upload a logo
// @access  Private
router.post('/logo', auth, (req, res, next) => {
  upload.single('logo')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }
    next();
  });
}, companyController.uploadLogo);

module.exports = router;
