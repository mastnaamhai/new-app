import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import api from '../../services/api';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await api.get('/bookings');
      setBookings(res.data);
    };
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, status) => {
    await api.put(`/bookings/${id}`, { status });
    const res = await api.get('/bookings');
    setBookings(res.data);
  };

  const handleGenerateLr = async (bookingId) => {
    try {
      const vehicleNumber = prompt('Enter Vehicle Number:');
      const driverName = prompt('Enter Driver Name:');
      const freightCharges = prompt('Enter Freight Charges:');

      if (!vehicleNumber || !driverName || !freightCharges) {
        return alert('All fields are required for LR generation.');
      }

      const res = await api.post('/lr', {
        bookingId,
        vehicleNumber,
        driverName,
        freightCharges: parseFloat(freightCharges),
      });
      alert(`LR generated successfully! LR Number: ${res.data.lrNumber}`);
      // Refresh bookings to show updated status
      const bookingsRes = await api.get('/bookings');
      setBookings(bookingsRes.data);
    } catch (err) {
      alert(`Error generating LR: ${err.response?.data?.msg || err.message}`);
    }
  };

  const handleGenerateInvoice = async (bookingId) => {
    try {
      const billingName = prompt('Enter Billing Name:');
      const billingAddress = prompt('Enter Billing Address:');
      const gstAmount = prompt('Enter GST Amount:');
      const totalAmount = prompt('Enter Total Amount:');

      if (!billingName || !billingAddress || !gstAmount || !totalAmount) {
        return alert('All fields are required for invoice generation.');
      }

      const res = await api.post('/invoices', {
        bookingId,
        billingDetails: { name: billingName, address: billingAddress },
        gstAmount: parseFloat(gstAmount),
        totalAmount: parseFloat(totalAmount),
      });
      alert(`Invoice generated successfully! Invoice Number: ${res.data.invoiceNumber}`);
    } catch (err) {
      alert(`Error generating invoice: ${err.response?.data?.msg || err.message}`);
    }
  };

  return (
    <div>
      <h2>Bookings</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
            <th>Update Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.name}</td>
              <td>{booking.from}</td>
              <td>{booking.to}</td>
              <td>{booking.status}</td>
              <td>
                <Form.Select
                  value={booking.status}
                  onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Delivered">Delivered</option>
                </Form.Select>
              </td>
              <td>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleGenerateLr(booking._id)}
                  disabled={booking.status !== 'Confirmed'}
                  className="me-2"
                >
                  Generate LR
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleGenerateInvoice(booking._id)}
                  disabled={booking.status !== 'Delivered'}
                >
                  Generate Invoice
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BookingList;
