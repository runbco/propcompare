import React from 'react';
import { PropertyGroup } from '../types/types';
import '../styles/GroupResultBlock.css';

// Define the props interface for the GroupResultBlock component
interface GroupResultBlockProps {
  propertyIndex: number;
  groupScores: { name: string; score: number }[];
}

// GroupResultBlock component: Displays scores for different groups of a specific property
const GroupResultBlock: React.FC<GroupResultBlockProps> = ({ propertyIndex, groupScores }) => {
  return (
    <div className="group-result-block">
      <h3>Property {propertyIndex + 1} Group Scores</h3>
      {/* Render each group's score */}
      {groupScores.map((group, index) => (
        <div key={index} className="group-score">
          <span>{group.name}:</span>
          {/* Display score rounded to 2 decimal places */}
          <span>{group.score.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
};

export default GroupResultBlock;
