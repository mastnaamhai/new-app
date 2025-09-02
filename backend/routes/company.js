const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company');
const auth = require('../middleware/auth');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// @route   GET api/company
// @desc    Get company information
// @access  Public
router.get('/', companyController.getCompanyInfo);

// @route   PUT api/company
// @desc    Update company information
// @access  Private
router.put('/', auth, companyController.updateCompanyInfo);

// @route   POST api/company/logo
// @desc    Upload a logo
// @access  Private
router.post('/logo', auth, upload.single('logo'), companyController.uploadLogo);

module.exports = router;
