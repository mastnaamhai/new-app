import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import MarkAsPaidModal from './MarkAsPaidModal';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const fetchInvoices = async () => {
    try {
      const res = await api.get('/invoices');
      setInvoices(res.data);
    } catch (err) {
      console.error("Failed to fetch invoices", err);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleOpenPaymentModal = (invoice) => {
    setSelectedInvoice(invoice);
    setShowPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedInvoice(null);
  };

  return (
    <>
      <h2>Invoices</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Invoice #</th>
            <th>Client Name</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice._id}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.billingDetails.name}</td>
              <td>{invoice.totalAmount}</td>
              <td>{invoice.paymentStatus}</td>
              <td>
                <Link to={`/invoice/${invoice._id}`} className="btn btn-primary btn-sm me-2">
                  View
                </Link>
                {invoice.paymentStatus === 'Unpaid' && (
                  <Button variant="success" size="sm" onClick={() => handleOpenPaymentModal(invoice)}>
                    Mark as Paid
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <MarkAsPaidModal
        show={showPaymentModal}
        handleClose={handleClosePaymentModal}
        invoice={selectedInvoice}
        onPaymentSuccess={fetchInvoices}
      />
    </>
  );
};

export default InvoiceList;
