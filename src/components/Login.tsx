import React from 'react';
import { useNavigate } from 'react-router-dom';

// Define the props interface for the Login component
interface LoginProps {
  onLogin: () => void;
}

// Login component: Renders a simple login form
const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic here
    onLogin();
    navigate('/compare');
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* TODO: Add login form fields */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
