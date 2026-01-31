## Uber Clone
This project is a comprehensive, full-stack clone of the popular ride-sharing service, Uber. It's designed to replicate the core functionalities of the platform, providing a seamless experience for both riders and drivers. The application includes features for ride booking, real-time driver tracking, and an integrated payment system. This project serves as a practical example of building a complex, real-time web application with modern technologies.

## Key Features
**User & Driver Authentication**:- Separate sign-up and login for riders and drivers.

**Ride Booking**:- Easily book a ride by setting pickup and drop-off locations.

**Real-Time Tracking**:- See your driver's location on the map as they head to you.

**Payment System**:- Integrated payments for a seamless transaction.

**Ride History**:- View a log of your previous trips.

## Tech Stack
**Frontend**:- React, React Router, Tailwind CSS

**Backend**:- Node.js, Express, MongoDB

**Real-time Communication**:- Socket.io

**Maps & Location**:- Google Maps API

### Getting Started
To get a local copy up and running, follow these simple steps.

### Prerequisites
- Node.js and npm
- MongoDB
- Google Maps API Key

### Installation & Setup
Clone the repository:

``` Bash

git clone https://github.com/Trishakumari1122/uber-clone.git
```
Install dependencies for both the Backend and frontend folders:

```Bash
cd Backend && npm install
cd ../frontend && npm install
```
Create a .env file in the Backend directory and add your MongoDB, JWT secret, and Google Maps API keys.

3. Running the Application
Start the backend server:

```Bash

cd Backend
npm start
```
Start the frontend:

```Bash

cd frontend
npm run dev
```
Open your browser to `http://localhost:5173`.

