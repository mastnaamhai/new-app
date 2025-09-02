import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import api from '../../services/api';

const GenerateInvoiceModal = ({ show, handleClose, booking, onInvoiceGenerated }) => {
  const [formData, setFormData] = useState({
    billingDetails: {
      name: '',
      address: '',
    },
    gstAmount: '',
    totalAmount: '',
  });

  useEffect(() => {
    // Pre-fill form when a booking is selected
    if (booking) {
      const isLrAvailable = booking.lorryReceipt && booking.lorryReceipt.gstOnFreight;
      setFormData({
        billingDetails: {
          name: booking.receiver.name || '',
          address: booking.dropAddress || '',
        },
        // Pre-fill from LR if available, otherwise leave blank for manual entry
        gstAmount: isLrAvailable ? booking.lorryReceipt.gstOnFreight.igst : '',
        totalAmount: isLrAvailable ? booking.lorryReceipt.gstOnFreight.totalFreight : '',
      });
    }
  }, [booking]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNestedChange = (group, e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [group]: {
        ...formData[group],
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/invoices', {
        bookingId: booking._id,
        ...formData,
      });
      alert(`Invoice Generated: ${res.data.invoiceNumber}`);
      onInvoiceGenerated(); // Callback to refresh the booking list
      handleClose(); // Close the modal
    } catch (err) {
      alert(`Error: ${err.response?.data?.msg || err.message}`);
    }
  };

  if (!booking) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Generate Invoice for Booking #{booking._id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Billing Details */}
          <h5 className="mt-4">Billing Details</h5>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Billing Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.billingDetails.name} onChange={(e) => handleNestedChange('billingDetails', e)} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Billing Address</Form.Label>
                <Form.Control type="text" name="address" value={formData.billingDetails.address} onChange={(e) => handleNestedChange('billingDetails', e)} required />
              </Form.Group>
            </Col>
          </Row>

          {/* Financials */}
          <h5 className="mt-4">Financial Details</h5>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>GST Amount</Form.Label>
                <Form.Control type="number" name="gstAmount" value={formData.gstAmount} onChange={handleChange} required readOnly={!!booking.lorryReceipt} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Total Amount</Form.Label>
                <Form.Control type="number" name="totalAmount" value={formData.totalAmount} onChange={handleChange} required readOnly={!!booking.lorryReceipt} />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="mt-4">
            Generate Invoice
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default GenerateInvoiceModal;
