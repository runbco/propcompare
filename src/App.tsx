import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import PropertyComparison from './components/PropertyComparison';
import Settings from './components/Settings';
import { PropertyData } from './types/types';
import NotFound from './components/NotFound';
import './styles/App.css';

function App() {
  // State variables for app configuration and data
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [propertyCount, setPropertyCount] = useState(3);
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [propertyNames, setPropertyNames] = useState<string[]>([]);
  const [selectedDiagrams, setSelectedDiagrams] = useState<string[]>([
    'PropertyResults', 'PropertySubgroup', 'PropertyFinancial',
    'IndustryAttractiveness', 'AgeInterestComparison'
  ]);
  const [isNewSession, setIsNewSession] = useState(true);

  // Load dark mode preference from local storage on initial render
  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkMode);
  }, []);

  // Update properties and property names when property count changes
  useEffect(() => {
    setProperties(prevProperties => {
      const newProperties = [...prevProperties];
      while (newProperties.length < propertyCount) {
        newProperties.push({
          financials: {},
          dummyField: {
            dataPoint: '',
            importance: 0,
            rating: 1
          }
        });
      }
      return newProperties.slice(0, propertyCount);
    });

    setPropertyNames(prevNames => {
      const newNames = [...prevNames];
      while (newNames.length < propertyCount) {
        newNames.push(`Property ${newNames.length + 1}`);
      }
      return newNames.slice(0, propertyCount);
    });
  }, [propertyCount]);

  // Apply dark mode class to body when isDarkMode changes
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  // Toggle dark mode and save preference to local storage
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  // Add a new property (up to a maximum of 10)
  const addProperty = () => {
    if (propertyCount < 10) {
      setPropertyCount(prevCount => prevCount + 1);
    }
  };

  // Remove a property (down to a minimum of 1)
  const removeProperty = () => {
    if (propertyCount > 1) {
      setPropertyCount(prevCount => prevCount - 1);
    }
  };

  // Update the name of a specific property
  const updatePropertyName = (index: number, newName: string) => {
    setPropertyNames(prevNames => {
      const newNames = [...prevNames];
      newNames[index] = newName;
      return newNames;
    });
  };

  // Set the initial property count (used when starting a new session)
  const setInitialPropertyCount = (count: number) => {
    setPropertyCount(count);
  };

  // Handle user login (currently just sets isNewSession to true)
  const handleLogin = () => {
    setIsNewSession(true);
  };

  // ComparisonPage component (rendered when on the comparison route)
  const ComparisonPage = () => {
    const navigate = useNavigate();

    // Handle user logout
    const handleLogout = () => {
      localStorage.removeItem('isLoggedIn');
      navigate('/');
    };

    return (
      <div>
        {/* Header with navigation and control buttons */}
        <div className="app-header">
          <h1>Property Comparison Tool</h1>
          <div className="button-group">
            <Link to="/comparison" className="header-button">Home</Link>
            <button onClick={addProperty} disabled={propertyCount >= 10}>
              Add Property
            </button>
            <button onClick={removeProperty} disabled={propertyCount <= 1}>
              Remove Property
            </button>
            <Link to="/settings" className="header-button">Settings</Link>
            <button onClick={handleLogout}>
              Logout
            </button>
            <button onClick={toggleDarkMode} className="dark-mode-toggle">
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
        {/* PropertyComparison component */}
        <PropertyComparison
          properties={properties}
          setProperties={setProperties}
          propertyNames={propertyNames}
          updatePropertyName={updatePropertyName}
          isDarkMode={isDarkMode}
          selectedDiagrams={selectedDiagrams}
          isNewSession={isNewSession}
        />
      </div>
    );
  };

  // Main app structure with routing
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
        <Routes>
          <Route 
            path="/" 
            element={
              <LandingPage 
                isDarkMode={isDarkMode} 
                toggleDarkMode={toggleDarkMode} 
                setInitialPropertyCount={setInitialPropertyCount}
              />
            } 
          />
          <Route
            path="/comparison"
            element={<ComparisonPage />}
          />
          <Route
            path="/settings"
            element={
              <Settings 
                isDarkMode={isDarkMode} 
                toggleDarkMode={toggleDarkMode}
                propertyCount={propertyCount}
                setPropertyCount={setPropertyCount}
                selectedDiagrams={selectedDiagrams}
                setSelectedDiagrams={setSelectedDiagrams}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
