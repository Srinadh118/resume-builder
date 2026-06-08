# Resume Builder (ATS Scoring)

A full-stack **Resume Builder** web app with a React frontend and an Express/MongoDB backend. Users can **register/login**, **create and manage resumes**, and view an **ATS score** computed from resume content.

---

## Features

### Authentication
- User **register** and **login**
- JWT-based protected API endpoints
- Frontend automatically attaches `Authorization: Bearer <token>` via an Axios interceptor

### Resume Management
- Create, edit, view, and delete resumes (CRUD)
- Dashboard shows:
  - All resumes
  - Highest/lowest ATS score summary
  - Dummy data used by the UI (see backend controller)

### ATS Scoring
- Backend computes `atsScore` on **create** and **update**
- Score is based on structured resume fields (general info, contact info, education, experience, skills, keywords)

### Frontend UX
- Resume editor with section navigation
- Preview page with template selection
- Download/Print using browser print (see `Preview` page)

---

## Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- Password hashing (`bcryptjs`)
- Request validation (`express-validator`)

### Frontend
- React + Vite
- React Router
- Axios
- UI libraries:
  - `html2canvas` and `jspdf` are included as dependencies (used for capture/export in the UI)

---

## Project Structure

```
resume-builder/
  backend/                # Express + MongoDB API
    server.js
    config/db.js
    routes/
      auth.js
      resumes.js
    controllers/
      authController.js
      resumeController.js
    middleware/
      auth.js              # JWT verification
    models/
      User.js
      Resume.js
    utils/
      atsScorer.js
      seed.js

  frontend/               # React + Vite app
    src/
      api/axios.js         # Axios instance + interceptors
      context/AuthContext.jsx
      hooks/useResumes.js
      pages/...
      components/...
    index.html
    vite.config.js
```

---

## Prerequisites

- Node.js installed
- MongoDB available (local or hosted)
- Environment variables for backend

---

## Setup

### 1) Backend

Go to `backend/` and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend server:

```bash
npm run dev
# or
npm start
```

Backend runs on: `http://localhost:5000`

---

### 2) Frontend

Go to `frontend/` and install dependencies:

```bash
cd frontend
npm install
```

Start the frontend server:

```bash
npm run dev
```

Optional: set backend URL
- Frontend uses `VITE_API_URL` (defaults to `http://localhost:5000`)

Example:

```bash
VITE_API_URL=http://localhost:5000 npm run dev
```

---

## How to Run (Recommended)

1. Start backend:
   
```bash
   cd backend && npm run dev
   
```
2. Start frontend:
   
```bash
   cd frontend && npm run dev
   
```
3. Open the frontend in your browser (Vite will print the URL)

---

## API Reference

### Health Check
- `GET /api/health`
  - Response: `{ status: "OK", message: "Server is running" }`

---

### Auth (Unprotected)
- `POST /api/auth/register`
  - Body:
    - `email` (valid email)
    - `password` (min 6 chars)
    - `firstName`
    - `lastName`
- `POST /api/auth/login`
  - Body:
    - `email`
    - `password`
- `GET /api/auth/me`
  - Requires:
    - `Authorization: Bearer <token>`

---

### Resumes (Protected)
All resume endpoints use `verifyToken` middleware.

> Authorization header format:
> `Authorization: Bearer <token>`

- `GET /api/resumes`
- `GET /api/resumes/dashboard`
- `GET /api/resumes/:id`
- `POST /api/resumes`
- `PUT /api/resumes/:id`
- `DELETE /api/resumes/:id`

---

## ATS Score Notes

- The backend computes and stores `atsScore` on **resume creation** and **resume update**.
- The score considers:
  - General info completeness (name/title/summary length)
  - Contact info presence (email/phone + social links)
  - Education and experience presence/length and description content
  - Skills count
  - Bonus keyword matches from a predefined keyword list

---

## Troubleshooting

- **401 Unauthorized after login**
  - Ensure you are using the correct backend URL in frontend (VITE_API_URL)
  - Confirm `JWT_SECRET` matches between runs
- **CORS / Network errors**
  - Check backend is reachable from the frontend
  - Ensure backend is running and `MONGO_URI` is valid
- **MongoDB connection fails**
  - Verify your `MONGO_URI` and that MongoDB is running

---

## License

ISC
