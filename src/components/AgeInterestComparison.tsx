import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PropertyData } from '../types/types';

// Define the props interface for the AgeInterestComparison component
interface AgeInterestComparisonProps {
  properties: PropertyData[];
  propertyNames: string[];
  isDarkMode: boolean;
}

const AgeInterestComparison: React.FC<AgeInterestComparisonProps> = ({ properties, propertyNames, isDarkMode }) => {
  // Generate mock data for the age interest comparison
  // This should be replaced with actual data in a real application
  const data = [20, 25, 30, 35, 40, 45, 50].map(age => {
    const dataPoint: { [key: string]: number } = { age };
    propertyNames.forEach(name => {
      // Generate a random interest level between 20 and 49 for each property
      dataPoint[name] = Math.floor(Math.random() * 30) + 20;
    });
    return dataPoint;
  });

  return (
    <div className="chart-container">
      <h3>Age Interest Comparison Across Properties</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="age" 
            label={{ value: 'Age', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            label={{ value: 'Interest Level', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend />
          {/* Generate a line for each property with a unique color */}
          {propertyNames.map((name, index) => (
            <Line 
              key={name} 
              type="monotone" 
              dataKey={name} 
              stroke={`hsl(${(index * 360) / propertyNames.length}, 70%, 50%)`} 
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AgeInterestComparison;
