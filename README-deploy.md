# Notes Manager — Deployment Notes

This cleaned repo is prepared for deployment:
- Frontend: Deploy to Vercel (React app in `frontend`)
  - Build command: `npm run build`
  - Output directory: `build`
  - Set environment variable `REACT_APP_API_URL` to your backend URL (e.g. `https://<your-backend>.onrender.com`) in Vercel if you want to override the default.

- Backend: Deploy to Render (Node/Express in `backend`)
  - Start command: `npm start`
  - Ensure environment variable `MONGODB_URI` is set in Render.
  - The server listens on `process.env.PORT` (Render sets this automatically).

I removed `node_modules` and `.git` to keep the zip small. Install dependencies on each platform during deployment (Render and Vercel will install automatically).

Common fixes applied:
- `backend/utils/connectDB.js` now warns if `MONGODB_URI` is missing and does not crash the process.
- Removed repo history and dependencies to avoid large zip.

If you want me to:
- Add a `render.yaml` or Dockerfile for Render, or
- Configure Vercel `vercel.json` for redirects / rewrites (e.g., proxy `/api` to backend),
tell me and I'll add it.

