import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await api.get('/invoices');
        setInvoices(res.data);
      } catch (err) {
        console.error("Failed to fetch invoices", err);
      }
    };
    fetchInvoices();
  }, []);

  return (
    <div>
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
                <Link to={`/invoice/${invoice._id}`} className="btn btn-primary btn-sm">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default InvoiceList;
