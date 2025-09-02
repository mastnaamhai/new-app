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

  return (
    <div>
      <h2>Bookings</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Load Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.sender.name}</td>
              <td>{booking.receiver.name}</td>
              <td>{booking.loadType}</td>
              <td>{booking.status}</td>
              <td>
                <Form.Select
                  value={booking.status}
                  onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in_pooling">In Pooling</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="delivered">Delivered</option>
                </Form.Select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BookingList;
