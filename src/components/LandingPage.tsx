import React, { useState } from 'react';
import LoginModal from './LoginModal';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

// Define the props interface for the LandingPage component
interface LandingPageProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setInitialPropertyCount: (count: number) => void;
}

// LandingPage component: Renders the main landing page of the application
const LandingPage: React.FC<LandingPageProps> = ({ isDarkMode, toggleDarkMode, setInitialPropertyCount }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [autoFillCredentials, setAutoFillCredentials] = useState(false);
  const navigate = useNavigate();

  // Handle the "Get Started" button click for different plans
  const handleGetStarted = (plan: string) => {
    switch (plan) {
      case 'free':
        setInitialPropertyCount(3);
        navigate('/comparison');
        break;
      case 'freePlus':
      case 'paid':
        setShowLoginModal(true);
        break;
      default:
        navigate('/comparison');
    }
  };

  return (
    <div className={`landing-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <header>
        <h1>PropCompare</h1>
        <div className="header-buttons">
          <button onClick={() => setShowLoginModal(true)} className="login-button">Login</button>
          <button onClick={toggleDarkMode} className="dark-mode-toggle">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>
      <main>
        {/* Hero section */}
        <section className="hero">
          <h2>Compare Properties with Ease</h2>
          <p>Make informed decisions by analyzing multiple properties side-by-side</p>
        </section>
        {/* Features section */}
        <section className="features">
          {/* Feature cards */}
        </section>
        {/* Pricing plans section */}
        <section className="pricing-plans">
          {/* Plan cards with "Get Started" buttons */}
        </section>
      </main>
      <footer>
        <p>&copy; 2024 PropCompare. All rights reserved.</p>
      </footer>
      {/* Render LoginModal when showLoginModal is true */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => {
            setShowLoginModal(false);
            setAutoFillCredentials(false);
          }} 
          autoFillCredentials={autoFillCredentials}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

export default LandingPage;
