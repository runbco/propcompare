import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PropertyData } from '../types/types';

// Define the props interface for the PreferencesComparison component
interface PreferencesComparisonProps {
  properties: PropertyData[];
  propertyNames: string[];
  isDarkMode: boolean;
}

// PreferencesComparison component: Renders a bar chart comparing preferences across different properties
const PreferencesComparison: React.FC<PreferencesComparisonProps> = ({ properties, propertyNames, isDarkMode }) => {
  // Define the list of preferences to be compared
  const preferences = ['Ambition', 'Intelligence', 'Sincerity', 'Fun', 'Attractiveness', 'Mutual Interests'];
  
  // Generate mock data for all properties and preferences
  // TODO: Replace this with actual data from the properties prop
  const data = preferences.map(pref => {
    const dataPoint: { [key: string]: string | number } = { name: pref };
    propertyNames.forEach(name => {
      // Assign random values (0-99) for each property and preference
      dataPoint[name] = Math.floor(Math.random() * 100);
    });
    return dataPoint;
  });

  return (
    <div className="chart-container">
      <h3>Property Preferences Comparison</h3>
      {/* Use ResponsiveContainer to make the chart responsive */}
      <ResponsiveContainer width="100%" height={400}>
        {/* Create a BarChart with the generated data */}
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          {/* Add a label to the Y-axis */}
          <YAxis label={{ value: 'Score', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          {/* Render a Bar component for each property */}
          {propertyNames.map((name, index) => (
            <Bar 
              key={name} 
              dataKey={name} 
              // Generate a unique color for each property based on its index
              fill={`hsl(${(index * 360) / propertyNames.length}, 70%, 50%)`} 
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PreferencesComparison;
