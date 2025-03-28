import React, { useState, useCallback, useEffect } from 'react';
import { PropertyData, PropertyFieldData, propertyGroups } from '../types/types';
import '../styles/PropertyForm.css';

interface PropertyFormProps {
  propertyIndex: number;
  data: PropertyData;
  onUpdate: (index: number, data: PropertyData) => void;
  isDarkMode: boolean;
}

const PropertyForm: React.FC<PropertyFormProps> = ({
  propertyIndex,
  data,
  onUpdate,
  isDarkMode
}) => {
  const [localData, setLocalData] = useState<PropertyData>(data);
  // Initialize all groups and subgroups as expanded
  const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>(() => {
    const initialState: { [key: string]: boolean } = {};
    propertyGroups.forEach(group => {
      initialState[group.name] = true;
      group.subGroups.forEach(subGroup => {
        initialState[`${group.name}-${subGroup.name}`] = true;
      });
    });
    return initialState;
  });

  // Update local data when prop data changes
  useEffect(() => {
    setLocalData(data);
  }, [data]);

  // Handle field changes
  const handleChange = useCallback((field: string, type: 'dataPoint' | 'importance' | 'rating', value: string) => {
    setLocalData(prevData => {
      const newData = { ...prevData };
      const fieldData = newData[field] || { dataPoint: '', importance: 'Not important', rating: 'Not good' };
      newData[field] = {
        ...fieldData,
        [type]: value
      };
      return newData;
    });
  }, []);

  // Handle blur events to update parent
  const handleBlur = useCallback(() => {
    onUpdate(propertyIndex, localData);
  }, [onUpdate, propertyIndex, localData]);

  // Toggle group expansion
  const toggleGroup = useCallback((groupName: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  }, []);

  console.log('PropertyForm - propertyGroups:', propertyGroups);
  console.log('PropertyForm - data:', data);

  return (
    <div className={`property-form ${isDarkMode ? 'dark-mode' : ''}`}>
      {propertyGroups.map(group => {
        console.log('Rendering group:', group.name);
        return (
          <div key={group.name} className="property-group">
            <h3 
              className="group-title" 
              onClick={() => toggleGroup(group.name)}
            >
              {group.name}
              <span className={`expand-icon ${expandedGroups[group.name] ? 'expanded' : ''}`}>
                {expandedGroups[group.name] ? '▼' : '▶'}
              </span>
            </h3>
            {expandedGroups[group.name] && (
              <div className="group-content">
                {group.subGroups.map(subGroup => {
                  console.log('Rendering subGroup:', subGroup.name, 'with fields:', subGroup.fields);
                  return (
                    <div key={subGroup.name} className="property-subgroup">
                      <h4 
                        className="subgroup-title"
                        onClick={() => toggleGroup(`${group.name}-${subGroup.name}`)}
                      >
                        {subGroup.name}
                        <span className={`expand-icon ${expandedGroups[`${group.name}-${subGroup.name}`] ? 'expanded' : ''}`}>
                          {expandedGroups[`${group.name}-${subGroup.name}`] ? '▼' : '▶'}
                        </span>
                      </h4>
                      {expandedGroups[`${group.name}-${subGroup.name}`] && (
                        <div className="subgroup-content">
                          {subGroup.fields.map(field => (
                            <div key={field.id} className="property-field">
                              <label>{field.label}</label>
                              <div className="field-inputs">
                                <input
                                  type="text"
                                  value={localData[field.id]?.dataPoint || ''}
                                  onChange={e => handleChange(field.id, 'dataPoint', e.target.value)}
                                  onBlur={handleBlur}
                                  className="data-point-input"
                                  placeholder="Enter data point"
                                />
                                <select
                                  value={localData[field.id]?.rating || 'Not good'}
                                  onChange={e => handleChange(field.id, 'rating', e.target.value)}
                                  onBlur={handleBlur}
                                  className="rating-select"
                                >
                                  <option value="Not good">Not good</option>
                                  <option value="Acceptable">Acceptable</option>
                                  <option value="Good">Good</option>
                                  <option value="Excellent">Excellent</option>
                                </select>
                                <select
                                  value={localData[field.id]?.importance || 'Not important'}
                                  onChange={e => handleChange(field.id, 'importance', e.target.value)}
                                  onBlur={handleBlur}
                                  className="importance-select"
                                >
                                  <option value="Not important">Not important</option>
                                  <option value="Somewhat important">Somewhat important</option>
                                  <option value="Very important">Very important</option>
                                </select>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(PropertyForm);
