import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import api from '../services/api';

const BookingPage = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSenderChange = (e) => {
    setFormData({ ...formData, sender: { ...formData.sender, [e.target.name]: e.target.value } });
  };
  
  const handleReceiverChange = (e) => {
    setFormData({ ...formData, receiver: { ...formData.receiver, [e.target.name]: e.target.value } });
  };

  const handleGoodsInfoChange = (e) => {
    setFormData({ ...formData, goodsInfo: { ...formData.goodsInfo, [e.target.name]: e.target.value } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/bookings', formData);
      alert('Booking request submitted successfully!');
    } catch (err) {
      alert('Error submitting booking request');
    }
  };

  return (
    <Container>
      <h1>Book Your Transport</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <h3>Sender Information</h3>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" onChange={handleSenderChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>GSTIN (optional)</Form.Label>
              <Form.Control type="text" name="gstin" onChange={handleSenderChange} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <h3>Receiver Information</h3>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" onChange={handleReceiverChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>GSTIN (optional)</Form.Label>
              <Form.Control type="text" name="gstin" onChange={handleReceiverChange} />
            </Form.Group>
          </Col>
        </Row>

        <h3 className="mt-4">Shipment Details</h3>
        <Form.Group>
          <Form.Label>Pickup Address</Form.Label>
          <Form.Control as="textarea" rows={3} name="pickupAddress" onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Drop Address</Form.Label>
          <Form.Control as="textarea" rows={3} name="dropAddress" onChange={handleChange} required />
        </Form.Group>

        <h3 className="mt-4">Goods Information</h3>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Goods Type</Form.Label>
              <Form.Control type="text" name="type" onChange={handleGoodsInfoChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Weight (kg)</Form.Label>
              <Form.Control type="number" name="weight" onChange={handleGoodsInfoChange} required />
            </Form.Group>
          </Col>
        </Row>

        <h3 className="mt-4">Load Type</h3>
        <Form.Group>
          <Form.Check type="radio" label="Full Truck Load (FTL)" name="loadType" value="FTL" onChange={handleChange} />
          <Form.Check type="radio" label="Part Load / Shared Truck (LTL)" name="loadType" value="LTL" onChange={handleChange} />
        </Form.Group>

        <h3 className="mt-4">Client Type</h3>
        <Form.Group>
          <Form.Check type="radio" label="B2B (Company)" name="clientType" value="B2B" onChange={handleChange} />
          <Form.Check type="radio" label="B2C (Individual)" name="clientType" value="B2C" onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Submit Booking Request
        </Button>
      </Form>
    </Container>
  );
};

export default BookingPage;