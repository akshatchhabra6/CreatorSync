# CreatorSync

CreatorSync is a full-stack MERN application that connects content creators with brands for campaign discovery, campaign management, and collaboration.

The application provides separate workflows for Creators and Brands with JWT-based authentication and role-based authorization.

## Features

### Creator

* Sign up and login
* Manage creator profile
* Browse available campaigns
* View campaign details
* Apply to campaigns
* Track submitted applications

### Brand

* Sign up and login
* Manage brand profile
* Create campaigns
* Manage created campaigns
* View campaign applicants
* Update application status

### Authentication

* JWT-based authentication
* Password hashing using bcrypt
* Protected API routes
* Role-based authorization
* Separate Creator and Brand access

### Campaigns

* Create and manage campaigns
* Browse available campaigns
* View campaign details
* Filter campaigns
* Brand-specific campaign management

### Applications

* Creators can apply to campaigns
* Duplicate applications are prevented
* Brands can view applications
* Brands can update application status

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

## Architecture

```text
CreatorSync
│
├── frontend
│   ├── React
│   ├── Vite
│   ├── Tailwind CSS
│   ├── React Router
│   └── Axios
│
├── backend
│   ├── Node.js
│   ├── Express.js
│   ├── Mongoose
│   └── REST APIs
│
└── MongoDB Atlas
```

Application flow:

```text
Creator / Brand
       |
       v
React Frontend
       |
     Axios
       |
       v
Express REST API
       |
       v
MongoDB
```

## Authentication Flow

The application uses JWT for authentication.

```text
User
 |
 | Signup / Login
 v
Express API
 |
 | Validate credentials
 v
JWT Token
 |
 v
Frontend
 |
 | Authenticated requests
 v
Protected API Routes
```

Passwords are hashed using bcrypt before being stored in the database.

Role-based authorization restricts access according to the user's role:

```text
Creator → Creator-specific operations
Brand   → Brand-specific operations
```

## Data Models

The backend contains the following main models:

```text
User
CreatorProfile
Brand
Campaign
Application
Message
```

### User

Stores authentication and user information including:

* Name
* Email
* Password hash
* Role

Supported roles:

```text
creator
brand
```

### Campaign

Stores campaigns created by brands and made available to creators.

### Application

Connects creators with campaigns and stores the application status.

Duplicate applications for the same campaign are prevented.

### Message

A Message model exists in the backend, but real-time messaging using Socket.IO is not currently implemented.

## Frontend Structure

The frontend contains separate workflows for Creators and Brands.

### Authentication

* Login
* Signup
* Role selection

### Creator

* Creator Dashboard
* Creator Profile
* Campaign Discovery
* Campaign Details
* Campaign Application

### Brand

* Brand Dashboard
* Brand Profile
* Campaign Creation
* Campaign Management
* Applicant Management

The frontend communicates with the backend through Axios-based API services.

## Environment Variables

### Backend

Create a `.env` file inside the backend directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Frontend

Create a `.env` file inside the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, `VITE_API_URL` should point to the deployed backend API.

Do not commit `.env` files or secrets to the repository.

## Getting Started

### Clone Repository

```bash
git clone https://github.com/akshatchhabra6/CreatorSync.git

cd CreatorSync
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend:

```text
http://localhost:5000
```

### Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## Deployment

The application uses separate deployment environments for the frontend and backend.

```text
React + Vite
     |
     v
   Vercel
     |
     | API Requests
     v
Node + Express
     |
     v
   Render
     |
     v
MongoDB Atlas
```

For the frontend production build:

```bash
npm run build
```

Environment variables should be configured separately for local development and production.

## Current Status

### Implemented

* React + Vite frontend
* Node.js + Express backend
* MongoDB integration
* JWT authentication
* bcrypt password hashing
* Role-based authorization
* Protected routes
* Creator profiles
* Brand profiles
* Campaign creation and management
* Campaign discovery and filtering
* Campaign applications
* Application status management
* Axios API integration

### Planned

* Real-time chat using Socket.IO
* Cloudinary image uploads
* Email verification
* Password reset
* Notifications
* Admin dashboard
* AI-based creator recommendations
* AI campaign description generation

## Author

Akshat Chhabra

GitHub: https://github.com/akshatchhabra6
