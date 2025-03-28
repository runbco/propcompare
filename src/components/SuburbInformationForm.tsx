import React from 'react';
import { PropertyData, suburbInformationGroup, ImportanceRating, PropertyRating } from '../types/types';
import '../styles/SuburbInformationForm.css';

// Define props interface for SuburbInformationForm component
interface SuburbInformationFormProps {
  data: PropertyData;
  onUpdate: (data: PropertyData) => void;
}

// Component for collecting and displaying suburb information
const SuburbInformationForm: React.FC<SuburbInformationFormProps> = ({ data, onUpdate }) => {
  // Handler for updating importance and rating values
  const handleChange = (field: string, type: 'importance' | 'rating', value: string) => {
    const newData = { ...data };
    if (type === 'importance') {
      newData[field] = { 
        ...newData[field], 
        importance: value as ImportanceRating 
      };
    } else {
      newData[field] = { 
        ...newData[field], 
        rating: value as PropertyRating 
      };
    }
    onUpdate(newData);
  };

  return (
    <div className="suburb-information-form">
      <h2>{suburbInformationGroup.name}</h2>
      {/* Iterate through subgroups and render form fields */}
      {suburbInformationGroup.subGroups.map(subGroup => (
        <div key={subGroup.name} className="suburb-subgroup">
          <h3>{subGroup.name}</h3>
          {subGroup.fields.map(field => (
            <div key={field.id} className="suburb-field">
              <label>{field.label}</label>
              {/* Importance selector */}
              <select
                value={data[field.id]?.importance || "Not important"}
                onChange={e => handleChange(field.id, 'importance', e.target.value)}
              >
                <option value="Not important">Not important</option>
                <option value="Somewhat important">Somewhat important</option>
                <option value="Very important">Very important</option>
              </select>
              {/* Rating selector */}
              <select
                value={data[field.id]?.rating || "Not good"}
                onChange={e => handleChange(field.id, 'rating', e.target.value)}
              >
                <option value="Not good">Not good</option>
                <option value="Acceptable">Acceptable</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
              </select>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SuburbInformationForm;
