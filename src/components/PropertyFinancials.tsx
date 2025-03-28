import React, { useState, useCallback, useMemo, useEffect } from 'react';
import '../styles/PropertyFinancials.css';
import { financialGroups, FinancialGroup } from '../data/financialGroups';

// Define interfaces for component props and financial data
interface FinancialData {
  [key: string]: string | number;
}

interface PropertyFinancialsProps {
  propertyIndex: number;
  data: FinancialData;
  onUpdate: (index: number, data: FinancialData) => void;
  isDarkMode: boolean;
}

// Main component for displaying and editing property financials
const PropertyFinancials: React.FC<PropertyFinancialsProps> = ({ propertyIndex, data, onUpdate, isDarkMode }) => {
  // State for tracking expanded/collapsed groups
  const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({});
  // Local state for financial data
  const [localData, setLocalData] = useState<FinancialData>(data);

  // Update local data when prop data changes
  useEffect(() => {
    setLocalData(data);
  }, [data]);

  // Handle input changes
  const handleChange = useCallback((field: string, value: string) => {
    setLocalData(prevData => ({
      ...prevData,
      [field]: value
    }));
  }, []);

  // Handle input blur events (update parent component)
  const handleBlur = useCallback((field: string) => {
    onUpdate(propertyIndex, {
      ...localData,
      [field]: localData[field] || ''
    });
  }, [onUpdate, propertyIndex, localData]);

  // Toggle expansion of financial groups
  const toggleGroup = useCallback((groupName: string, event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setExpandedGroups(prev => ({ ...prev, [groupName]: !prev[groupName] }));
    }
  }, []);

  // Render individual input fields
  const renderInput = useCallback((field: string, type: string, label: string) => (
    <div className="financial-field" key={field}>
      <label htmlFor={`${propertyIndex}-${field}`}>{label}</label>
      <input
        id={`${propertyIndex}-${field}`}
        type={type}
        value={localData[field] || ''}
        onChange={(e) => handleChange(field, e.target.value)}
        onBlur={() => handleBlur(field)}
      />
    </div>
  ), [localData, handleChange, handleBlur, propertyIndex]);

  // Render a group of financial fields
  const renderGroup = useCallback((group: FinancialGroup) => {
    const isExpanded = expandedGroups[group.name] !== false; // Default to expanded
    return (
      <div className="financial-group" key={group.name}>
        <h3 
          className="group-title"
          onClick={(e) => toggleGroup(group.name, e)}
          aria-expanded={isExpanded}
          aria-controls={`group-${group.name}`}
        >
          {group.name}
          <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
            {isExpanded ? '▼' : '▶'}
          </span>
        </h3>
        <div id={`group-${group.name}`} hidden={!isExpanded}>
          {group.fields.map((field) => renderInput(field.name, field.type, field.label))}
        </div>
      </div>
    );
  }, [expandedGroups, renderInput, toggleGroup]);

  // Memoize financial groups to prevent unnecessary re-renders
  const memoizedGroups = useMemo(() => financialGroups, []);

  return (
    <div className={`property-financials ${isDarkMode ? 'dark-mode' : ''}`}>
      {memoizedGroups.map((group) => renderGroup(group))}
    </div>
  );
};

export default React.memo(PropertyFinancials);
