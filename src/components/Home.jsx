import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';


export default function Home() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const goToEditProfile = () => {
        navigate('/edit-profile');
    };

    return (
        <div className="home">
            <nav className="navbar">
                <div className="navbar-brand">DesCode</div>

                <div className="navbar-user">
                    <span className="username">Hello, {user?.name}</span>

                    <div className="dropdown">
                        <button
                            className="settings-button"
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            Settings ⚙️
                        </button>

                        {showMenu && (
                            <ul className="dropdown-menu">
                                <li onClick={goToEditProfile}>Edit Profile</li>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>

            <main className="homepage-content">
                <h1>Welcome to Your Homepage</h1>
                <p>You are signed in successfully!</p>
            </main>
        </div>
    );
}
