import React, { useEffect, useState } from 'react';
import './ManageUsers.css'; 
import AdminNavbar from './AdminNavbar';
import Message from './Toast';

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setMessage({ text: 'No token found. Please log in.', type: 'error' });
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/admin/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const err = await response.json();
                    setMessage({ text: err.message || 'Failed to load users.', type: 'error' });
                    return;
                }

                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setMessage({ text: 'Something went wrong!', type: 'error' });
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="manage-users">
            <AdminNavbar />
            <Message text={message.text} type={message.type} />

            <h2>Manage Users</h2>

            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? '✅ Yes' : '❌ No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}