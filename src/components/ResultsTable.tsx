import React from 'react';
import { PropertyData, propertyGroups } from '../types/types';
import GroupScore from './GroupScore';
import '../styles/ResultsTable.css';

interface ResultsTableProps {
  properties: PropertyData[];
  groupScores: { [key: string]: number }[];
  selectedGroups: string[];
  setSelectedGroups: (groups: string[]) => void;
  isDarkMode: boolean;
  propertyNames: string[];
  updatePropertyName: (index: number, newName: string) => void;
}

const ResultsTable: React.FC<ResultsTableProps> = ({
  properties,
  groupScores,
  selectedGroups,
  setSelectedGroups,
  isDarkMode,
  propertyNames,
  updatePropertyName
}) => {
  if (!properties || properties.length === 0) {
    return (
      <div className={`results-table empty ${isDarkMode ? 'dark-mode' : ''}`}>
        <p>No property data available. Please add properties to compare.</p>
      </div>
    );
  }

  if (!groupScores || groupScores.length === 0) {
    return (
      <div className={`results-table loading ${isDarkMode ? 'dark-mode' : ''}`}>
        <p>Calculating scores...</p>
      </div>
    );
  }

  // Calculate total rating for a property's scores
  const calculateTotalRating = (scores: { [key: string]: number }): number => {
    const values = Object.values(scores);
    return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  };

  // Toggle selection of a group
  const toggleGroup = (groupName: string) => {
    if (selectedGroups.includes(groupName)) {
      setSelectedGroups(selectedGroups.filter(g => g !== groupName));
    } else {
      setSelectedGroups([...selectedGroups, groupName]);
    }
  };

  return (
    <div className={`results-table ${isDarkMode ? 'dark-mode' : ''}`}>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            {propertyNames.map((name, index) => (
              <th key={index}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => updatePropertyName(index, e.target.value)}
                  className="property-name-input"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Render rows for each property group */}
          {propertyGroups.map((group, groupIndex) => {
            const groupSubgroups = group.subGroups.map(sg => sg.name);
            const allSelected = groupSubgroups.every(sg => selectedGroups.includes(sg));
            
            return (
              <React.Fragment key={group.name}>
                {/* Group header row */}
                <tr className="group-header">
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={() => {
                          if (allSelected) {
                            setSelectedGroups(selectedGroups.filter(g => !groupSubgroups.includes(g)));
                          } else {
                            const uniqueGroups = [...selectedGroups];
                            groupSubgroups.forEach(group => {
                              if (!uniqueGroups.includes(group)) {
                                uniqueGroups.push(group);
                              }
                            });
                            setSelectedGroups(uniqueGroups);
                          }
                        }}
                      />
                      <strong>{group.name}</strong>
                    </label>
                  </td>
                  {/* Group scores for each property */}
                  {groupScores.map((propertyScore, propIndex) => (
                    <td key={propIndex}>
                      <GroupScore 
                        score={
                          Object.entries(propertyScore)
                            .filter(([key]) => groupSubgroups.includes(key))
                            .reduce((acc, [_, value]) => acc + value, 0) / groupSubgroups.length
                        } 
                      />
                    </td>
                  ))}
                </tr>
                {/* Subgroup rows */}
                {group.subGroups.map((subGroup) => (
                  <tr 
                    key={subGroup.name} 
                    className={selectedGroups.includes(subGroup.name) ? '' : 'hidden-row'}
                  >
                    <td>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedGroups.includes(subGroup.name)}
                          onChange={() => toggleGroup(subGroup.name)}
                        />
                        {subGroup.name}
                      </label>
                    </td>
                    {/* Subgroup scores for each property */}
                    {groupScores.map((propertyScore, propIndex) => (
                      <td key={propIndex}>
                        <GroupScore score={propertyScore[subGroup.name] || 0} />
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            );
          })}
          {/* Total rating row */}
          <tr className="total-row">
            <td><strong>Total Rating</strong></td>
            {groupScores.map((propertyScore, index) => (
              <td key={index}>
                <GroupScore score={calculateTotalRating(propertyScore)} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
