# CreatorSync 2.0 — Full-Stack Scaffold

A MERN-stack rebuild of the CreatorSync influencer-marketing platform, generated from the
production roadmap. This is a working scaffold: backend REST API + React frontend wired
together, ready for you to connect a MongoDB Atlas cluster and deploy.

## Structure

```
CreatorSync/
├── backend/     Express + Mongoose REST API (JWT auth, bcrypt)
└── frontend/    React + Vite + Tailwind CSS, React Router, Axios
```

## Quick Start

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env: set MONGO_URI to your MongoDB Atlas connection string, and JWT_SECRET
npm run dev
```
Runs on `http://localhost:5000`. Health check: `GET /api/health`.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api
npm run dev
```
Runs on `http://localhost:5173`.

## What's implemented

**Backend**
- User model with bcrypt password hashing, role field (`creator` / `brand`)
- JWT auth: signup, login, get/update profile, `protect` + `authorize(role)` middleware
- CreatorProfile, Brand, Campaign, Application, Message models
- Full REST routes for creators, brands, campaigns, applications (matches the roadmap's API list)
- Campaigns support filtering (`status`, `platform`, `niche`, `mine=true` for a brand's own campaigns)
- Applications: creators apply once per campaign (unique index), brands update status

**Frontend**
- Auth context (JWT stored client-side), protected routes by role
- Login / Signup with Creator ↔ Brand role toggle (mirrors original UI)
- Creator Dashboard, Creator Profile (editable), Discover Campaigns, Campaign Details (apply flow)
- Brand Dashboard (campaign table with live applicant counts), Brand Profile (editable), New Campaign form
- All pages call the real backend via Axios services in `src/services/`

## Not yet built (bonus features from the roadmap)

These were intentionally left out of this pass to keep the scaffold lean — happy to add any of
them next:
- Real-time chat (Socket.io) — `Message` model exists, no live socket layer yet
- Email verification / forgot password
- Cloudinary image uploads (profile/portfolio images are plain URL fields for now)
- AI creator recommendation / campaign description generator
- Admin panel
- Notifications

## Deployment (per roadmap)

| Layer     | Target          |
|-----------|-----------------|
| Frontend  | Vercel          |
| Backend   | Render          |
| Database  | MongoDB Atlas   |
| Images    | Cloudinary      |

Both `backend` and `frontend` have `.env.example` files — set the real values as environment
variables in Vercel/Render dashboards rather than committing `.env`.

## Verified working

- Backend: all files pass `node --check`, `npm install` succeeds
- Frontend: `npm run build` succeeds cleanly (Vite production build, no errors)

You'll still need your own MongoDB Atlas URI to actually run the API against a live database.
