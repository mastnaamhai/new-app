import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import BookingList from '../../components/admin/BookingList';
import CompanySettings from '../../components/admin/CompanySettings';

const AdminPage = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Tabs defaultActiveKey="bookings" id="admin-tabs">
        <Tab eventKey="bookings" title="Bookings">
          <BookingList />
        </Tab>
        <Tab eventKey="settings" title="Settings">
          <CompanySettings />
        </Tab>
        {/* Add other tabs for clients and ledgers later */}
      </Tabs>
    </div>
  );
};

export default AdminPage;