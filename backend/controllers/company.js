const CompanyInfo = require('../models/CompanyInfo');

exports.getCompanyInfo = async (req, res) => {
  try {
    let info = await CompanyInfo.findOne();
    if (!info) {
      info = new CompanyInfo();
      await info.save();
    }
    res.json(info);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateCompanyInfo = async (req, res) => {
  try {
    let info = await CompanyInfo.findOne();
    if (!info) {
      info = new CompanyInfo(req.body);
      await info.save();
      return res.json(info);
    }

    info = await CompanyInfo.findOneAndUpdate({}, { $set: req.body }, { new: true });
    res.json(info);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.uploadLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'Please upload a file' });
    }

    const logo = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    let info = await CompanyInfo.findOne();
    if (!info) {
      info = new CompanyInfo({ logo });
      await info.save();
    } else {
      info.logo = logo;
      await info.save();
    }

    res.json({ msg: 'Logo uploaded successfully', logo });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
