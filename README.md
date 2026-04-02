# Portfolio (Frontend + Backend)

This repository contains:
- React + Vite frontend at repo root
- Node.js + Express backend in `backend/`

## Local Development

### 1) Frontend
```bash
npm install
npm run dev
```

### 2) Backend
```bash
cd backend
npm install
npm run dev
```

Backend env file (`backend/.env`):
```env
PORT=3001
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
```

Frontend env file (`.env`):
```env
VITE_API_BASE_URL=http://localhost:3001
VITE_ADMIN_PASSCODE=your_admin_passcode
```

## Production Deployment (Render Blueprint)

`render.yaml` creates:
- `portfolio-frontend` (Static Site)
- `portfolio-backend` (Web Service)

Set these env vars in Render:
- Frontend: `VITE_API_BASE_URL` = backend service URL
- Backend: `MONGODB_URI`, `FRONTEND_URL` = frontend service URL

## Important

Some auth files under `backend/routes/` still contain broken imports/logic from older code and are not mounted in `backend/server.js` yet. The docs API routes are wired and deploy-ready.