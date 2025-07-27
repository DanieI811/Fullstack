import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' }); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify({ name: formData.name, email: formData.email }));
        navigate('/home'); 
      } else {
        alert(result.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Could not connect to server');
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <button type="submit">Sign Up</button>

      {/* Navigation to Login Page */}
      <p className="login-link">
        Already have an account? <span onClick={() => navigate('/login')}>Log in</span>
      </p>
    </form>
  );
}