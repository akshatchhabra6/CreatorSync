# CreatorSync

CreatorSync is a full-stack brand–influencer collaboration platform designed to simplify the process of discovering creators, launching campaigns, and managing collaborations.

The platform provides separate experiences for Brands and Creators, with role-based authentication and campaign management features.

## Links

* Live Demo: https://creator-sync-mocha.vercel.app/
* GitHub Repository: https://github.com/akshatchhabra6/CreatorSync

## Features

### Creator

* Create and manage creator profile
* Discover available brand campaigns
* View campaign details
* Apply to suitable campaigns
* Track campaign applications
* Manage creator information

### Brand

* Create and manage brand profile
* Create and manage campaigns
* Discover creators
* View creator applications
* Manage campaign applicants
* Track campaign-related activities

### Authentication and Security

* Role-based authentication
* JWT-based authentication
* Protected routes
* Password hashing using bcrypt
* Secure API communication

## Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Vite

### Backend

* Node.js
* Express.js
* REST APIs

### Database

* MongoDB
* Mongoose

### Tools and Deployment

* Git
* GitHub
* VS Code
* Vercel

## Project Structure

```text
CreatorSync/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## Getting Started

Follow these steps to run CreatorSync locally.

### 1. Clone the Repository

```bash
git clone https://github.com/akshatchhabra6/CreatorSync.git
cd CreatorSync
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend:

```bash
npm start
```

### 3. Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The application will be available at the local Vite URL shown in the terminal.

## Screenshots

### Home Page

Add homepage screenshot here.

### Creator Dashboard

Add creator dashboard screenshot here.

### Brand Dashboard

Add brand dashboard screenshot here.

### Campaign Management

Add campaign management screenshot here.

## Application Workflow

```text
Brand
  |
  |-- Create Profile
  |-- Create Campaign
  |-- Review Creator Applications
  |
  v
Creator
  |
  |-- Create Profile
  |-- Discover Campaigns
  |-- Apply to Campaigns
```

## Project Objective

CreatorSync aims to provide a centralized platform where brands can connect with relevant creators and manage influencer campaigns efficiently, while creators can discover collaboration opportunities and apply to campaigns that match their interests.

## Future Enhancements

* Real-time messaging between brands and creators
* Email notifications
* Cloud-based media uploads
* Advanced creator search and filtering
* AI-based creator recommendations
* Campaign analytics

## What I Learned

Through this project, I gained practical experience in:

* Full-stack web application development
* REST API development
* MongoDB database integration
* JWT authentication and authorization
* Role-based access control
* Frontend and backend integration
* Git and GitHub workflow
* Deployment and environment configuration

## Developer

**Akshat Chhabra**

B.Tech Computer Science Engineering
JECRC University

* GitHub: https://github.com/akshatchhabra6
* LinkedIn: Add your LinkedIn profile URL here
