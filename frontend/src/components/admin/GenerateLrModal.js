import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import api from '../../services/api';

const GenerateLrModal = ({ show, handleClose, booking, onLrGenerated }) => {
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    driverName: '',
    eWayBillNumber: '',
    goodsDetails: {
      weight: '',
      packageCount: '',
      hsnCode: '',
    },
    freightPaymentTerm: 'To be Billed',
    gstOnFreight: {
      rate: 5, // Defaulting to 5%
      baseAmount: '',
      cgst: 0,
      sgst: 0,
      igst: 0,
      totalFreight: '',
    },
  });

  useEffect(() => {
    // Reset form when modal is reopened for a new booking
    if (booking) {
      setFormData({
        vehicleNumber: '',
        driverName: '',
        eWayBillNumber: '',
        goodsDetails: { weight: '', packageCount: '', hsnCode: '' },
        freightPaymentTerm: 'To be Billed',
        gstOnFreight: { rate: 5, baseAmount: '', cgst: 0, sgst: 0, igst: 0, totalFreight: '' },
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

  // Auto-calculate GST and Total Freight
  useEffect(() => {
    const base = parseFloat(formData.gstOnFreight.baseAmount) || 0;
    const rate = parseFloat(formData.gstOnFreight.rate) || 0;

    if (base > 0 && rate > 0) {
      const igst = (base * rate) / 100;
      const total = base + igst;
      setFormData((prev) => ({
        ...prev,
        gstOnFreight: {
          ...prev.gstOnFreight,
          igst: igst.toFixed(2),
          totalFreight: total.toFixed(2),
          cgst: 0, // Assuming IGST for simplicity
          sgst: 0,
        },
      }));
    }
  }, [formData.gstOnFreight.baseAmount, formData.gstOnFreight.rate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/lr', {
        bookingId: booking._id,
        ...formData,
      });
      alert(`LR Generated: ${res.data.lrNumber}`);
      onLrGenerated(); // Callback to refresh the booking list
      handleClose(); // Close the modal
    } catch (err) {
      alert(`Error: ${err.response?.data?.msg || err.message}`);
    }
  };

  if (!booking) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Generate Lorry Receipt (LR) for Booking #{booking._id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Vehicle & Driver */}
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Vehicle Number</Form.Label>
                <Form.Control type="text" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Driver Name</Form.Label>
                <Form.Control type="text" name="driverName" value={formData.driverName} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          {/* Goods Details */}
          <h5 className="mt-4">Goods Details</h5>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Weight (e.g., 10 Ton)</Form.Label>
                <Form.Control type="text" name="weight" value={formData.goodsDetails.weight} onChange={(e) => handleNestedChange('goodsDetails', e)} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Package Count</Form.Label>
                <Form.Control type="number" name="packageCount" value={formData.goodsDetails.packageCount} onChange={(e) => handleNestedChange('goodsDetails', e)} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>HSN Code</Form.Label>
                <Form.Control type="text" name="hsnCode" value={formData.goodsDetails.hsnCode} onChange={(e) => handleNestedChange('goodsDetails', e)} />
              </Form.Group>
            </Col>
          </Row>

          {/* E-Way Bill & Payment Term */}
          <Row className="mt-3">
            <Col>
              <Form.Group>
                <Form.Label>E-Way Bill Number</Form.Label>
                <Form.Control type="text" name="eWayBillNumber" value={formData.eWayBillNumber} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Freight Payment Term</Form.Label>
                <Form.Select name="freightPaymentTerm" value={formData.freightPaymentTerm} onChange={handleChange}>
                  <option value="To be Billed">To be Billed</option>
                  <option value="Paid">Paid</option>
                  <option value="To Pay">To Pay</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* Freight & GST */}
          <h5 className="mt-4">Freight & GST Details</h5>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Base Freight Amount</Form.Label>
                <Form.Control type="number" name="baseAmount" value={formData.gstOnFreight.baseAmount} onChange={(e) => handleNestedChange('gstOnFreight', e)} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>GST Rate (%)</Form.Label>
                <Form.Control type="number" name="rate" value={formData.gstOnFreight.rate} onChange={(e) => handleNestedChange('gstOnFreight', e)} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>IGST Amount</Form.Label>
                <Form.Control type="text" name="igst" value={formData.gstOnFreight.igst} readOnly />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Total Freight</Form.Label>
                <Form.Control type="text" name="totalFreight" value={formData.gstOnFreight.totalFreight} readOnly />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="mt-4">
            Generate LR
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default GenerateLrModal;
