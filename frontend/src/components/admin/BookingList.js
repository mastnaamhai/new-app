import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import api from '../../services/api';
import GenerateLrModal from './GenerateLrModal';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [showLrModal, setShowLrModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchBookings = async () => {
    const res = await api.get('/bookings');
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, status) => {
    await api.put(`/bookings/${id}`, { status });
    fetchBookings(); // Refresh the list
  };

  const handleOpenLrModal = (booking) => {
    setSelectedBooking(booking);
    setShowLrModal(true);
  };

  const handleCloseLrModal = () => {
    setShowLrModal(false);
    setSelectedBooking(null);
  };

  const handleGenerateInvoice = async (bookingId) => {
    // This part can be converted to a modal later if needed
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
      fetchBookings();
    } catch (err) {
      alert(`Error generating invoice: ${err.response?.data?.msg || err.message}`);
    }
  };

  return (
    <>
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
                  onClick={() => handleOpenLrModal(booking)}
                  disabled={booking.consignmentNoteGenerated || booking.status !== 'Confirmed'}
                  className="me-2"
                >
                  {booking.consignmentNoteGenerated ? 'LR Generated' : 'Generate LR'}
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
      <GenerateLrModal
        show={showLrModal}
        handleClose={handleCloseLrModal}
        booking={selectedBooking}
        onLrGenerated={fetchBookings}
      />
    </>
  );
};

export default BookingList;
