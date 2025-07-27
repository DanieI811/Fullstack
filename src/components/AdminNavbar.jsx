import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminNavbar.css'; 

export default function AdminNavbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        setShowDropdown(false);
        navigate('/login');
    };
    
    const goToManageUsers = () => {
        navigate('/manage-users')
    };

    const goToManageAdmins = () => {
        navigate('/manage-admins')
    }

    return (
        <div className="admin-navbar">
            <h2>Admin Panel</h2>

            <div className="settings-dropdown">
                <button
                    className="settings-button"
                    onClick={() => setShowDropdown(!showDropdown)}>
                    
                    Settings ⚙️
                </button>

                {showDropdown && (
                    <ul className="dropdown-menu">
                        <li onClick={goToManageUsers}>Manage Users</li>
                        <li onClick={goToManageAdmins}>Manage Admins</li>
                        <li onClick={handleLogout}>Logout</li>
                    </ul>
                )}
            </div>
        </div>
    );
}