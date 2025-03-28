import React from 'react';
import { PropertyData } from '../types/types';
import PropertyResultsDiagram from './PropertyResultsDiagram';
import PropertySubgroupDiagram from './PropertySubgroupDiagram';
import PropertyFinancialComparison from './PropertyFinancialComparison';
import IndustryAttractiveness from './IndustryAttractiveness';
import AgeInterestComparison from './AgeInterestComparison';
import '../styles/DiagramSelector.css';

// Define the props interface for the DiagramSelector component
interface DiagramSelectorProps {
  selectedDiagrams: string[];
  setSelectedDiagrams: React.Dispatch<React.SetStateAction<string[]>>;
  properties: PropertyData[];
  propertyNames: string[];
  isDarkMode: boolean;
}

/**
 * DiagramSelector Component
 * 
 * This component allows users to select and preview different types of diagrams.
 * It manages the state of selected diagrams and renders previews for each diagram type.
 */
const DiagramSelector: React.FC<DiagramSelectorProps> = ({
  selectedDiagrams,
  setSelectedDiagrams,
  properties,
  propertyNames,
  isDarkMode,
}) => {
  // Define all available diagram types
  const allDiagrams = [
    'PropertyResults', 'PropertySubgroup', 'PropertyFinancial',
    'IndustryAttractiveness', 'AgeInterestComparison'
  ];

  /**
   * Handle checkbox change for diagram selection
   * @param diagram - The name of the diagram being toggled
   */
  const handleChange = (diagram: string) => {
    setSelectedDiagrams(prev => 
      prev.includes(diagram) 
        ? prev.filter(d => d !== diagram) 
        : [...prev, diagram]
    );
  };

  // Dummy values for preview purposes
  // These are used to satisfy prop requirements of diagram components without actual functionality
  const dummySelectedGroups: string[] = [];
  const dummySetSelectedGroups = () => {};
  const dummyUpdatePropertyName = () => {};

  /**
   * Render the appropriate diagram component based on the diagram type
   * @param diagram - The type of diagram to render
   * @returns The rendered diagram component or a message if no data is available
   */
  const renderDiagram = (diagram: string) => {
    // Check if there's data available to render diagrams
    if (properties.length === 0 || propertyNames.length === 0) {
      return <div>No data available for preview</div>;
    }

    // Render the appropriate diagram component based on the diagram type
    switch (diagram) {
      case 'PropertyResults':
        return (
          <PropertyResultsDiagram 
            properties={properties} 
            propertyNames={propertyNames}
            isDarkMode={isDarkMode}
            selectedGroups={dummySelectedGroups}
            setSelectedGroups={dummySetSelectedGroups}
            updatePropertyName={dummyUpdatePropertyName}
          />
        );
      case 'PropertySubgroup':
        return (
          <PropertySubgroupDiagram 
            properties={properties} 
            propertyNames={propertyNames}
            isDarkMode={isDarkMode}
            selectedGroups={dummySelectedGroups}
          />
        );
      case 'PropertyFinancial':
        return (
          <PropertyFinancialComparison 
            properties={properties} 
            propertyNames={propertyNames}
            isDarkMode={isDarkMode}
          />
        );
      case 'IndustryAttractiveness':
        return (
          <IndustryAttractiveness 
            properties={properties} 
            propertyNames={propertyNames}
            isDarkMode={isDarkMode}
          />
        );
      case 'AgeInterestComparison':
        return (
          <AgeInterestComparison 
            properties={properties} 
            propertyNames={propertyNames}
            isDarkMode={isDarkMode}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="diagram-selector">
      <h2>Select Diagrams to Display</h2>
      {/* Map through all diagram types and render checkboxes with previews */}
      {allDiagrams.map(diagram => (
        <div key={diagram} className="diagram-option">
          <label>
            <input
              type="checkbox"
              checked={selectedDiagrams.includes(diagram)}
              onChange={() => handleChange(diagram)}
            />
            {diagram}
          </label>
          <div className="diagram-preview">
            {renderDiagram(diagram)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiagramSelector;
