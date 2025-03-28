import React from 'react';

// Define the props interface for the DiagramFilter component
interface DiagramFilterProps {
  selectedDiagrams: string[];
  setSelectedDiagrams: React.Dispatch<React.SetStateAction<string[]>>;
}

const DiagramFilter: React.FC<DiagramFilterProps> = ({ selectedDiagrams, setSelectedDiagrams }) => {
  // Define all available diagram types
  const allDiagrams = [
    'PropertyResults', 'PropertySubgroup', 'PerceivedAttractiveness', 
    'PreferencesComparison', 'IndustryAttractiveness', 'AgeInterestComparison'
  ];

  // Handle checkbox change for diagram selection
  const handleChange = (diagram: string) => {
    if (selectedDiagrams.includes(diagram)) {
      // Remove the diagram if it's already selected
      setSelectedDiagrams(selectedDiagrams.filter(d => d !== diagram));
    } else {
      // Add the diagram if it's not selected
      setSelectedDiagrams([...selectedDiagrams, diagram]);
    }
  };

  return (
    <div className="diagram-filter">
      <h3>Select Diagrams to Display:</h3>
      {/* Render checkboxes for each diagram type */}
      {allDiagrams.map(diagram => (
        <label key={diagram}>
          <input
            type="checkbox"
            checked={selectedDiagrams.includes(diagram)}
            onChange={() => handleChange(diagram)}
          />
          {diagram}
        </label>
      ))}
    </div>
  );
};

export default DiagramFilter;
