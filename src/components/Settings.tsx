import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Settings.css';
import DiagramSelector from './DiagramSelector';

// Define the props interface for the Settings component
interface SettingsProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  propertyCount: number;
  setPropertyCount: React.Dispatch<React.SetStateAction<number>>;
  selectedDiagrams: string[];
  setSelectedDiagrams: React.Dispatch<React.SetStateAction<string[]>>;
}

// Settings component for managing user preferences and application settings
const Settings: React.FC<SettingsProps> = ({ 
  isDarkMode, 
  toggleDarkMode, 
  propertyCount, 
  setPropertyCount,
  selectedDiagrams,
  setSelectedDiagrams
}) => {
  // Local state for suburb comparison settings
  const [compareSuburbs, setCompareSuburbs] = useState('no');
  const [suburbCount, setSuburbCount] = useState(1);

  // Function to handle saving changes (currently just logs and shows an alert)
  const handleSaveChanges = () => {
    console.log(`Compare Suburbs: ${compareSuburbs}, Suburb Count: ${suburbCount}`);
    // TODO: Implement actual save logic (e.g., API calls, state updates)
    alert('Changes saved successfully!'); // Temporary feedback
  };

  return (
    <div className={`settings ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="settings-header">
        <h1>Settings</h1>
        <div className="settings-actions">
          <button onClick={handleSaveChanges} className="save-changes-button">Save Changes</button>
          <Link to="/comparison" className="back-button">Back to Comparison</Link>
        </div>
      </div>
      <div className="settings-options">
        {/* Dark Mode Toggle */}
        <div className="setting-option">
          <label>Dark Mode</label>
          <button onClick={toggleDarkMode}>
            {isDarkMode ? 'Disable' : 'Enable'}
          </button>
        </div>
        {/* Property Count Selector */}
        <div className="setting-option">
          <label>Properties to compare:</label>
          <select 
            value={propertyCount} 
            onChange={(e) => setPropertyCount(Number(e.target.value))}
          >
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
        {/* Suburb Comparison Toggle */}
        <div className="setting-option">
          <label>Compare different suburbs?</label>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                value="yes" 
                checked={compareSuburbs === 'yes'} 
                onChange={() => setCompareSuburbs('yes')}
              /> Yes
            </label>
            <label>
              <input 
                type="radio" 
                value="no" 
                checked={compareSuburbs === 'no'} 
                onChange={() => setCompareSuburbs('no')}
              /> No
            </label>
          </div>
        </div>
        {/* Conditional rendering of suburb count selector */}
        {compareSuburbs === 'yes' && (
          <div className="setting-option">
            <label>Number of suburbs:</label>
            <select 
              value={suburbCount} 
              onChange={(e) => setSuburbCount(Number(e.target.value))}
            >
              {[...Array(5)].map((_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      {/* DiagramSelector component for choosing which diagrams to display */}
      <DiagramSelector 
        selectedDiagrams={selectedDiagrams}
        setSelectedDiagrams={setSelectedDiagrams}
        properties={[]} // TODO: Pass actual property data
        propertyNames={[]} // TODO: Pass actual property names
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default Settings;
