import React, { useState, useEffect } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import api from '../../services/api';

const CompanySettings = () => {
  const [info, setInfo] = useState({});
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      const res = await api.get('/company');
      setInfo(res.data);
    };
    fetchInfo();
  }, []);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleBankChange = (e) => {
    setInfo({ ...info, bankDetails: { ...info.bankDetails, [e.target.name]: e.target.value } });
  };

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put('/company', info);
    alert('Company information updated');
  };

  const handleLogoUpload = async () => {
    const formData = new FormData();
    formData.append('logo', logo);
    const res = await api.post('/company/logo', formData);
    setInfo({ ...info, logo: res.data.logo });
    alert('Logo uploaded');
  };

  return (
    <div>
      <h2>Company Settings</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Company Name</Form.Label>
          <Form.Control type="text" name="name" value={info.name || ''} onChange={handleChange} />
        </Form.Group>
        {/* Add other fields for address, phone, email, etc. */}
        <h3>Bank Details</h3>
        <Form.Group>
          <Form.Label>Bank Name</Form.Label>
          <Form.Control type="text" name="name" value={info.bankDetails?.name || ''} onChange={handleBankChange} />
        </Form.Group>
        {/* Add other bank fields */}
        <Button type="submit" className="mt-3">Save Settings</Button>
      </Form>

      <h3 className="mt-4">Logo</h3>
      {info.logo && <Image src={info.logo} thumbnail width="200" />}
      <Form.Group>
        <Form.Label>Upload new logo</Form.Label>
        <Form.Control type="file" onChange={handleLogoChange} />
      </Form.Group>
      <Button onClick={handleLogoUpload} className="mt-3">Upload Logo</Button>
    </div>
  );
};

export default CompanySettings;
