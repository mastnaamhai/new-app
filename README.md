# All India Logistics Chennai - Full-Stack Application

This is a full-stack web application for a goods transport agency, built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- **Admin Dashboard:** Manage bookings, clients, ledgers, and company settings.
- **Booking System:** Customers can submit booking requests for FTL and LTL transport.
- **Authentication:** JWT-based authentication for the admin panel.
- **Company Information Management:** Admin can update company details and upload a logo.

## Tech Stack

- **Frontend:** React.js, React Bootstrap, React Router
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   ```

2. **Install backend dependencies:**
   ```sh
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```sh
   cd ../frontend
   npm install
   ```

### Configuration

1. **Create a `.env` file in the `backend` directory:**
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

2. **Create an admin user:**
   - You can use the `/api/auth/register` endpoint to create an admin user. Send a POST request with `username` and `password`.

### Running the Application

1. **Start the backend server:**
   ```sh
   cd backend
   npm start
   ```

2. **Start the frontend development server:**
   ```sh
   cd ../frontend
   npm start
   ```

## Deployment

### Backend (Render)

1. Create a new Web Service on Render.
2. Connect your Git repository.
3. Set the following environment variables:
   - `MONGO_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: Your JWT secret.
4. Set the start command to `npm start`.
5. Set the root directory to `backend`.

### Frontend (Netlify)

1. Create a new site on Netlify.
2. Connect your Git repository.
3. Set the build command to `npm run build`.
4. Set the publish directory to `frontend/build`.
5. Set the `REACT_APP_API_URL` environment variable to your Render backend URL.
6. Create a `_redirects` file in the `frontend/public` directory with the following content:
   ```
   /* /index.html 200
   ```
