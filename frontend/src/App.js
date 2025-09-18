import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const loggedIn = !!localStorage.getItem('token');

  return (
    <div className="container">
      <nav className="nav">
        <Link to="/">Notes</Link>
        {loggedIn ? (
          <>
            <Link to="/admin">Admin</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><AdminPanel/></PrivateRoute>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </div>
  );
}

export default App;
