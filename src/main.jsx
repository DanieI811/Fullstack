import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './components/Home';
import EditProfile from './components/EditProfile';
import Admin from './components/Admin'; 
import ManageUsers from './components/ManageUsers'; 
import Login from './components/Login';
import SignupForm from './components/SignupForm';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/manage-users" element={<ManageUsers />} />
      </Routes>
    </Router>
  </React.StrictMode>
);