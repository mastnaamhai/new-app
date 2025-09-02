import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import api from '../services/api';
import './InvoiceViewPage.css'; // We will create this file for custom styles

const InvoiceViewPage = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const invoiceRes = await api.get(`/invoices/${id}`);
        setInvoice(invoiceRes.data);

        const companyRes = await api.get('/company');
        setCompanyInfo(companyRes.data);
      } catch (err) {
        console.error('Failed to fetch invoice data', err);
      }
    };

    fetchInvoiceData();
  }, [id]);

  if (!invoice || !companyInfo) {
    return <Container>Loading...</Container>;
  }

  const { booking, lorryReceipt } = invoice.booking;

  return (
    <Container className="invoice-container mt-5">
      <Card className="position-relative">
        {invoice.paymentStatus === 'Paid' && <div className="paid-stamp">PAID</div>}
        <Card.Header>
          <Row>
            <Col>
              <h1>INVOICE</h1>
            </Col>
            <Col className="text-end">
              <h2>{companyInfo.name}</h2>
              <p>{companyInfo.address}</p>
              <p>GSTIN: {companyInfo.gstin || 'N/A'}</p>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row className="mb-4">
            <Col>
              <h5>Bill To:</h5>
              <p><strong>{invoice.billingDetails.name}</strong></p>
              <p>{invoice.billingDetails.address}</p>
            </Col>
            <Col className="text-end">
              <p><strong>Invoice #:</strong> {invoice.invoiceNumber}</p>
              <p><strong>Date:</strong> {new Date(invoice.date).toLocaleDateString()}</p>
              {lorryReceipt && <p><strong>LR #:</strong> {lorryReceipt.lrNumber}</p>}
            </Col>
          </Row>

          <Table bordered>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Freight Charges for transportation of goods
                  {lorryReceipt && ` (${lorryReceipt.goodsDetails.packageCount} packages, ${lorryReceipt.goodsDetails.weight})`}
                </td>
                <td>{lorryReceipt ? lorryReceipt.gstOnFreight.baseAmount.toFixed(2) : 'N/A'}</td>
              </tr>
            </tbody>
          </Table>

          <Row className="mt-4">
            <Col></Col>
            <Col md={4}>
              <Table>
                <tbody>
                  <tr>
                    <td>Subtotal</td>
                    <td className="text-end">{lorryReceipt ? lorryReceipt.gstOnFreight.baseAmount.toFixed(2) : 'N/A'}</td>
                  </tr>
                  <tr>
                    <td>IGST @ {lorryReceipt ? lorryReceipt.gstOnFreight.rate : 'N/A'}%</td>
                    <td className="text-end">{lorryReceipt ? lorryReceipt.gstOnFreight.igst.toFixed(2) : 'N/A'}</td>
                  </tr>
                  <tr className="fw-bold">
                    <td>Total</td>
                    <td className="text-end">{invoice.totalAmount.toFixed(2)}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="text-center">
          <p>Thank you for your business!</p>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default InvoiceViewPage;
