import React from 'react';

// Define the props interface for the GroupScore component
interface GroupScoreProps {
  score: number;
}

// GroupScore component: Displays a single group score
const GroupScore: React.FC<GroupScoreProps> = ({ score }) => {
  // Handle potential NaN values by defaulting to 0
  const displayScore = isNaN(score) ? 0 : score;
  // Render the score rounded to 2 decimal places
  return <div>{displayScore.toFixed(2)}</div>;
};

export default GroupScore;
