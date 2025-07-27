import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(result.user));
                if (result.user.isAdmin) {
                    navigate('/admin');
                } else {
                    navigate('/home');
                }
            } else {
                setMessage(result.message || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            setMessage('Something went wrong!');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {message && <div className="error-message">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="text" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <button type="submit">Login</button>
                <p className="signup-link">
                    Don't have an account? <span onClick={() => navigate('/')}>Signup</span>
                </p>
            </form>
        </div>
    );
}