import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';
import ConfirmModal from './ConfirmModal';
import Message from './Toast';

export default function EditProfile() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [showModal, setShowModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [message, setMessage] = useState({ text: '', type: '' });
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && initialLoad) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                currentPassword: '',
                newPassword: ''
            });
            setInitialLoad(false);
        }
    }, [initialLoad]); 

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: formData.name,
            email: formData.email,
            originalEmail: user.email,
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword
        };

        try {
            const response = await fetch('http://localhost:5000/api/users/me', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok) {
                setMessage({ text: 'Profile updated successfully!', type: 'success' });
                localStorage.setItem('user', JSON.stringify({ name: formData.name, email: formData.email }));
                setTimeout(() => navigate('/home'), 1500); // Redirect after message
            } else {
                setMessage({ text: result.message || 'Failed to update profile.', type: 'error' });
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage({ text: 'Something went wrong!', type: 'error' });
        }


    };

    const handleDeleteAccount = () => {
        setShowModal(true);
    };

    const confirmDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch('http://localhost:5000/api/users/me', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ originalEmail: user.email })
            });

            const result = await response.json();

            if (response.ok) {
                setMessage({ text: 'Your account has been deleted.', type: 'success' });
                localStorage.removeItem('user');
                setTimeout(() => navigate('/'));
            } else {
                setMessage({ text: result.message || 'Failed to delete account.', type: 'error' });
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage({ text: 'Something went wrong!', type: 'error' });
        } finally {
            setIsDeleting(false);
            setShowModal(false);
        }
    };

    return (
        <div className="edit-profile">

            <Message text={message.text} type={message.type} />

            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Current Password:</label>
                    <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} />
                </div>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Confirm New Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword || ''}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save Changes</button>

                <hr />

                <button
                    type="button"
                    className="delete-button"
                    onClick={handleDeleteAccount}
                >
                    Delete Account
                </button>
            </form>
            <ConfirmModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete your account? This action cannot be undone."
                isLoading={isDeleting}
            />
        </div>
    );
}