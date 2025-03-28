/**
 * PropertyComparison Component
 * 
 * This component is responsible for managing the comparison of multiple properties.
 * It handles the following:
 * - Rendering PropertyForm for each property
 * - Displaying ResultsTable with comparison data
 * - Managing state for selected groups and diagrams
 * - Pagination for multiple properties
 * 
 * Props:
 * - properties: Array of PropertyData objects
 * - setProperties: Function to update properties
 * - isDarkMode: Boolean for theme
 * - propertyNames: Array of property names
 * - updatePropertyName: Function to update property names
 * - selectedDiagrams: Array of selected diagram types
 * - setSelectedDiagrams: Function to update selected diagrams
 * - isNewSession: Boolean to determine if it's a new session
 * 
 * Key State:
 * - selectedGroups: Array of selected property groups for comparison
 * - currentPage: Current page for pagination
 * 
 * TODO:
 * - Implement property deletion
 * - Add more visual comparisons (charts, graphs)
 */

import React, { useState, useCallback, useEffect } from 'react';
import PropertyForm from './PropertyForm';
import PropertyFinancials from './PropertyFinancials';
import ResultsTable from './ResultsTable';
import PropertyResultsDiagram from './PropertyResultsDiagram';
import PropertySubgroupDiagram from './PropertySubgroupDiagram';
import IndustryAttractiveness from './IndustryAttractiveness';
import AgeInterestComparison from './AgeInterestComparison';
import { PropertyData, propertyGroups } from '../types/types';
import { calculateGroupScores } from '../utils/calculations';
import { generateTestData } from '../utils/testDataGenerator';
import '../styles/PropertyComparison.css';
import PropertyFinancialComparison from './PropertyFinancialComparison';

// Define the props interface for the PropertyComparison component
interface PropertyComparisonProps {
  properties: PropertyData[];
  setProperties: React.Dispatch<React.SetStateAction<PropertyData[]>>;
  isDarkMode: boolean;
  propertyNames: string[];
  updatePropertyName: (index: number, newName: string) => void;
  selectedDiagrams: string[];
  isNewSession: boolean;
}

interface GroupScore {
  [key: string]: number;
}

const PropertyComparison: React.FC<PropertyComparisonProps> = ({ 
  properties, 
  setProperties, 
  isDarkMode,
  propertyNames,
  updatePropertyName,
  selectedDiagrams,
  isNewSession
}) => {
  // Initialize state for selected groups, expanded sections, and pagination
  const [selectedGroups, setSelectedGroups] = useState<string[]>(
    propertyGroups.flatMap(group => group.subGroups.map(subgroup => subgroup.name))
  );
  const [isResultsExpanded, setIsResultsExpanded] = useState(!isNewSession);
  const [isDiagramsExpanded, setIsDiagramsExpanded] = useState(!isNewSession);
  const [expandedProperties, setExpandedProperties] = useState<number[]>(
    properties.map((_, index) => index)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 5;
  const [groupScores, setGroupScores] = useState<GroupScore[]>([]);

  // Callback function to update a specific property
  const handlePropertyUpdate = useCallback((index: number, data: PropertyData) => {
    setProperties(prevProperties => {
      const newProperties = [...prevProperties];
      newProperties[index] = data;
      return newProperties;
    });
  }, [setProperties]);

  // Callback function to update financial data for a specific property
  const handleFinancialsUpdate = useCallback((index: number, newFinancialData: any) => {
    setProperties(prevProperties => {
      const newProperties = [...prevProperties];
      newProperties[index] = { 
        ...newProperties[index], 
        financials: {
          ...newProperties[index].financials,
          ...newFinancialData
        }
      };
      return newProperties;
    });
  }, []);

  // Calculate scores when properties change
  useEffect(() => {
    const scores = properties.map(property => calculateGroupScores(property));
    setGroupScores(scores);
  }, [properties]);

  // Function to add test data to all properties
  const handleAddTestData = () => {
    setProperties(prevProperties => prevProperties.map(property => {
      const testData = generateTestData();
      return {
        ...property,
        ...testData,
        financials: {
          ...property.financials,
          ...testData.financials
        }
      };
    }));
  };

  // Function to toggle the expansion of a property card
  const togglePropertyExpansion = (index: number) => {
    setExpandedProperties(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  // Calculate the range of properties to display on the current page
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

  // Function to handle pagination
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Callback function to save changes for a specific property
  const handleSaveChanges = useCallback((index: number) => {
    // TODO: Implement the logic to save changes for a specific property
    console.log(`Saving changes for property ${index + 1}`);
    alert(`Changes saved for ${propertyNames[index]}`);
  }, [propertyNames]);

  return (
    <div className={`property-comparison ${isDarkMode ? 'dark-mode' : ''}`}>
      <h2>Property Comparison</h2>
      
      <button onClick={handleAddTestData} className="add-test-data-button">
        Add Test Data
      </button>
      
      {/* Results Table Section */}
      <div className="results-section">
        <h3 onClick={() => setIsResultsExpanded(!isResultsExpanded)}>
          Results Table {isResultsExpanded ? '▼' : '▶'}
        </h3>
        {isResultsExpanded && (
          <ResultsTable 
            properties={properties}
            groupScores={groupScores}
            selectedGroups={selectedGroups}
            setSelectedGroups={setSelectedGroups}
            isDarkMode={isDarkMode}
            propertyNames={propertyNames}
            updatePropertyName={updatePropertyName}
          />
        )}
      </div>

      {/* Property Diagrams Section */}
      <div className="diagrams-section">
        <h3 onClick={() => setIsDiagramsExpanded(!isDiagramsExpanded)}>
          Property Diagrams {isDiagramsExpanded ? '▼' : '▶'}
        </h3>
        {isDiagramsExpanded && (
          <>
            {/* Render selected diagrams based on the selectedDiagrams prop */}
            {selectedDiagrams.includes('PropertyResults') && (
              <div className="diagram-container">
                <PropertyResultsDiagram 
                  properties={properties}
                  selectedGroups={selectedGroups}
                  setSelectedGroups={setSelectedGroups}
                  isDarkMode={isDarkMode}
                  propertyNames={propertyNames}
                  updatePropertyName={updatePropertyName}
                />
              </div>
            )}
            {selectedDiagrams.includes('PropertySubgroup') && (
              <div className="diagram-container">
                <PropertySubgroupDiagram 
                  properties={properties}
                  selectedGroups={selectedGroups}
                  isDarkMode={isDarkMode}
                  propertyNames={propertyNames}
                />
              </div>
            )}
            {selectedDiagrams.includes('PropertyFinancial') && (
              <div className="diagram-container">
                <PropertyFinancialComparison 
                  properties={properties}
                  isDarkMode={isDarkMode}
                  propertyNames={propertyNames}
                />
              </div>
            )}
            {selectedDiagrams.includes('IndustryAttractiveness') && (
              <div className="diagram-container">
                <IndustryAttractiveness 
                  properties={properties}
                  isDarkMode={isDarkMode}
                  propertyNames={propertyNames}
                />
              </div>
            )}
            {selectedDiagrams.includes('AgeInterestComparison') && (
              <div className="diagram-container">
                <AgeInterestComparison 
                  properties={properties}
                  isDarkMode={isDarkMode}
                  propertyNames={propertyNames}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Property Cards Section */}
      <div className="property-cards">
        {currentProperties.map((property, index) => {
          const propertyIndex = indexOfFirstProperty + index;
          const isExpanded = expandedProperties.includes(propertyIndex);
          return (
            <div key={propertyIndex} className="property-card">
              <div className="property-card-header">
                <h2 onClick={() => togglePropertyExpansion(propertyIndex)}>
                  {propertyNames[propertyIndex]} {isExpanded ? '▼' : '▶'}
                </h2>
                <button 
                  className="save-changes-button"
                  onClick={() => handleSaveChanges(propertyIndex)}
                >
                  Save Changes
                </button>
              </div>
              {isExpanded && (
                <div className="property-content">
                  <div className="property-financials-section">
                    <h3>Financials</h3>
                    <PropertyFinancials
                      propertyIndex={propertyIndex}
                      data={property.financials || {}}
                      onUpdate={handleFinancialsUpdate}
                      isDarkMode={isDarkMode}
                    />
                  </div>
                  <div className="property-forms">
                    <h3>Details</h3>
                    <PropertyForm
                      propertyIndex={propertyIndex}
                      data={property}
                      onUpdate={handlePropertyUpdate}
                      isDarkMode={isDarkMode}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {properties.length > propertiesPerPage && (
        <div className="pagination">
          {Array.from({ length: Math.ceil(properties.length / propertiesPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(PropertyComparison);
