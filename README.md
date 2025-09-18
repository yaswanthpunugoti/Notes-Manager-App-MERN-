# Notes Manager (MERN) - Full Project (with Admin)

This zip contains a full MERN stack notes manager app with:
- User registration & login (JWT)
- Notes CRUD (user-scoped)
- Admin panel (view users, view/delete all notes)

## How to run locally

### Backend
cd backend
cp .env.example .env
# set MONGO_URI and JWT_SECRET
npm install
npm run dev

### Frontend
cd frontend
cp .env.example .env
# adjust REACT_APP_API_URL if backend is not on localhost
npm install
npm start

Frontend will run on http://localhost:3000 by default.
