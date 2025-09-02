const mongoose = require('mongoose');

const CompanyInfoSchema = new mongoose.Schema({
  name: { type: String, default: 'ALL INDIA LOGISTICS CHENNAI' },
  address: { type: String, default: 'No-51-C, Shri Balaji Nagar, Part-1 Extension, Puzhal Camp, Chennai-600066' },
  phoneNumbers: { type: [String], default: ['9790700241', '9003045541'] },
  email: { type: String, default: 'allindialogisticschennai@gmail.com' },
  website: { type: String, default: 'www.allindialogisticschennai.in' },
  gstin: { type: String, default: '33BKTPR6363P123' },
  bankDetails: {
    name: { type: String, default: 'ICICI BANK' },
    accountNumber: { type: String, default: '603505016293' },
    ifsc: { type: String, default: 'ICICI00060' },
  },
  logo: { type: String } // URL to the uploaded logo
});

module.exports = mongoose.model('CompanyInfo', CompanyInfoSchema);
