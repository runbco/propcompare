import React from 'react';
import { PropertyGroup } from '../types/types';

// Define the props interface for the FilterSelector component
interface FilterSelectorProps {
  groups: PropertyGroup[];
  selectedGroups: string[];
  onFilterChange: (selectedGroups: string[]) => void;
}

// FilterSelector component: Allows users to select and filter property groups
const FilterSelector: React.FC<FilterSelectorProps> = ({ groups, selectedGroups, onFilterChange }) => {
  // Create a flat array of all subgroup names
  const allSubgroups = groups.flatMap(group => group.subGroups.map(subgroup => subgroup.name));

  // Handler to select all subgroups
  const handleSelectAll = () => {
    onFilterChange(allSubgroups);
  };

  // Handler to deselect all subgroups
  const handleSelectNone = () => {
    onFilterChange([]);
  };

  // Handler to toggle individual subgroup selection
  const handleToggleSubgroup = (subgroupName: string) => {
    const newSelectedGroups = selectedGroups.includes(subgroupName)
      ? selectedGroups.filter(name => name !== subgroupName)
      : [...selectedGroups, subgroupName];
    onFilterChange(newSelectedGroups);
  };

  return (
    <div className="filter-selector">
      {/* Buttons for selecting all or none of the subgroups */}
      <button onClick={handleSelectAll}>Select All</button>
      <button onClick={handleSelectNone}>Select None</button>
      {/* Render checkboxes for each group and its subgroups */}
      {groups.map(group => (
        <div key={group.name}>
          <h4>{group.name}</h4>
          {group.subGroups.map(subgroup => (
            <label key={subgroup.name}>
              <input
                type="checkbox"
                checked={selectedGroups.includes(subgroup.name)}
                onChange={() => handleToggleSubgroup(subgroup.name)}
              />
              {subgroup.name}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FilterSelector;
