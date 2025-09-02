import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import api from '../services/api';
import './InvoiceViewPage.css'; // We will create this file for custom styles

const InvoiceViewPage = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      // This endpoint doesn't exist yet. We will mock the data for now.
      // const res = await api.get(`/invoices/${id}`);
      // setInvoice(res.data);

      // Mock data for UI development
      setInvoice({
        _id: id,
        invoiceNumber: 'INV-2001',
        date: new Date().toLocaleDateString(),
        billingDetails: {
          name: 'Receiver Company Inc.',
          address: '123 Receiver St, Receiver City, 110011',
        },
        totalAmount: 5250,
        lorryReceipt: {
          lrNumber: 'LR-1001',
          date: new Date().toLocaleDateString(),
          goodsDetails: {
            weight: '10 Ton',
            packageCount: 50,
          },
          gstOnFreight: {
            baseAmount: 5000,
            igst: 250,
          }
        },
        // Mock company info
        companyInfo: {
          name: 'All India Logistics Chennai',
          address: '456 Transporter Ave, Transport City, 600001',
          gstin: '29ABCDE1234F1Z5',
        }
      });
    };

    fetchInvoice();
  }, [id]);

  if (!invoice) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container className="invoice-container mt-5">
      <Card>
        <Card.Header>
          <Row>
            <Col>
              <h1>INVOICE</h1>
            </Col>
            <Col className="text-end">
              <h2>{invoice.companyInfo.name}</h2>
              <p>{invoice.companyInfo.address}</p>
              <p>GSTIN: {invoice.companyInfo.gstin}</p>
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
              <p><strong>Date:</strong> {invoice.date}</p>
              <p><strong>LR #:</strong> {invoice.lorryReceipt.lrNumber}</p>
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
                <td>Freight Charges for transportation of goods ({invoice.lorryReceipt.goodsDetails.packageCount} packages, {invoice.lorryReceipt.goodsDetails.weight})</td>
                <td>{invoice.lorryReceipt.gstOnFreight.baseAmount.toFixed(2)}</td>
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
                    <td className="text-end">{invoice.lorryReceipt.gstOnFreight.baseAmount.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>IGST @ 5%</td>
                    <td className="text-end">{invoice.lorryReceipt.gstOnFreight.igst.toFixed(2)}</td>
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
