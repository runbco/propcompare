import React, { useState, useEffect } from 'react';
import '../styles/LoginModal.css';
import { useNavigate } from 'react-router-dom';

// Define the props interface for the LoginModal component
interface LoginModalProps {
  onClose: () => void;
  autoFillCredentials: boolean;
  isDarkMode: boolean;
}

// LoginModal component: Renders a modal dialog for user login
const LoginModal: React.FC<LoginModalProps> = ({ onClose, autoFillCredentials, isDarkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Auto-fill credentials if autoFillCredentials prop is true
  useEffect(() => {
    if (autoFillCredentials) {
      setEmail('admin@propcompare.com');
      setPassword('propcom123');
    }
  }, [autoFillCredentials]);

  // Handle login form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with actual authentication logic
    if (email === 'admin@propcompare.com' && password === 'propcom123') {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/comparison');
    } else {
      setError('Invalid email or password');
    }
  };

  // Auto-fill test credentials
  const handleTestLogin = () => {
    setEmail('admin@propcompare.com');
    setPassword('propcom123');
  };

  return (
    <div className={`login-modal-overlay ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="login-modal">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          {/* Email input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* Password input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* Display error message if there's an error */}
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
        </form>
        {/* Test login button for easy access */}
        <button className="test-login-button" onClick={handleTestLogin}>
          Test Login
        </button>
        {/* Close button for the modal */}
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
