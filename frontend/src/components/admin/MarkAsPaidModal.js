import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../../services/api';

const MarkAsPaidModal = ({ show, handleClose, invoice, onPaymentSuccess }) => {
  const [formData, setFormData] = useState({
    paymentDate: new Date().toISOString().split('T')[0], // Default to today
    paymentMode: 'Bank Transfer',
    paymentNotes: '',
  });

  useEffect(() => {
    // Reset form when modal is reopened
    setFormData({
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMode: 'Bank Transfer',
      paymentNotes: '',
    });
  }, [invoice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!invoice) return;

    try {
      await api.put(`/invoices/${invoice._id}/payment`, formData);
      alert('Invoice marked as paid successfully!');
      onPaymentSuccess();
      handleClose();
    } catch (err) {
      alert(`Error: ${err.response?.data?.msg || err.message}`);
    }
  };

  if (!invoice) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Mark Invoice #{invoice.invoiceNumber} as Paid</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Payment Date</Form.Label>
            <Form.Control type="date" name="paymentDate" value={formData.paymentDate} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Payment Mode</Form.Label>
            <Form.Select name="paymentMode" value={formData.paymentMode} onChange={handleChange}>
              <option>Bank Transfer</option>
              <option>Cash</option>
              <option>Cheque</option>
              <option>Online</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Payment Notes</Form.Label>
            <Form.Control as="textarea" rows={3} name="paymentNotes" value={formData.paymentNotes} onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Confirm Payment
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MarkAsPaidModal;
