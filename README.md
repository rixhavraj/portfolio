# Portfolio Monorepo

This repo contains both apps:
- `frontend/` static portfolio site
- `backend/` Node + Express API

## Local Run

### Backend
```bash
cd backend
npm install
npm run dev
```

Backend env (`backend/.env`):
- `PORT=3001`
- `MONGODB_URI=...`
- `FRONTEND_URL=http://localhost:5173`

### Frontend
Open `frontend/index.html` in browser (or serve with any static server).

## Render Deployment (single repo)

Use Blueprint deploy with `render.yaml`.
It provisions:
- `portfolio-backend` (Web Service)
- `portfolio-frontend` (Static Site)

Required backend env vars on Render:
- `MONGODB_URI`
- `FRONTEND_URL` (your frontend Render URL)

## Git Push

```bash
git init
git add .
git commit -m "setup monorepo with frontend and backend"
git branch -M main
git remote add origin https://github.com/<your-username>/portfolio.git
git push -u origin main
```