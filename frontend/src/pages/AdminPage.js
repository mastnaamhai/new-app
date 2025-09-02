import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import BookingList from '../components/admin/BookingList';
import CompanySettings from '../components/admin/CompanySettings';
import InvoiceList from '../components/admin/InvoiceList';

const AdminPage = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Tabs defaultActiveKey="bookings" id="admin-tabs" className="mb-3">
        <Tab eventKey="bookings" title="Bookings">
          <BookingList />
        </Tab>
        <Tab eventKey="invoices" title="Invoices">
          <InvoiceList />
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