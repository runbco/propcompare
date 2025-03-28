import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PropertyData } from '../types/types';
import { calculateGroupScores } from '../utils/calculations';

// Define props interface for the component
interface PropertyResultsDiagramProps {
  properties: PropertyData[];
  selectedGroups: string[];
  setSelectedGroups: (groups: string[]) => void;
  isDarkMode: boolean;
  propertyNames: string[];
  updatePropertyName: (index: number, name: string) => void;
}

const PropertyResultsDiagram: React.FC<PropertyResultsDiagramProps> = ({
  properties,
  selectedGroups,
  setSelectedGroups,
  isDarkMode,
  propertyNames,
  updatePropertyName
}) => {
  // Calculate group scores for each property
  const groupScores = properties.map(prop => calculateGroupScores(prop));

  // Prepare data for the chart
  const data = Object.entries(groupScores[0])
    .filter(([groupName]) => selectedGroups.includes(groupName))
    .map(([groupName, score]) => {
      const dataPoint: { [key: string]: any } = { name: groupName };
      properties.forEach((_, propIndex) => {
        dataPoint[propertyNames[propIndex]] = Number(groupScores[propIndex][groupName].toFixed(2));
      });
      return dataPoint;
    });

  // Define colors for the bars
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE'];

  return (
    <div className={`property-results-diagram ${isDarkMode ? 'dark-mode' : ''}`}>
      <h3>Property Group Scores Comparison</h3>
      {/* Responsive container for the bar chart */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* Customizable grid lines */}
          <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#555' : '#ccc'} />
          {/* X-axis configuration */}
          <XAxis dataKey="name" stroke={isDarkMode ? '#fff' : '#333'} />
          {/* Y-axis configuration */}
          <YAxis stroke={isDarkMode ? '#fff' : '#333'} />
          {/* Tooltip configuration with dark mode support */}
          <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#fff' : '#333' }} />
          <Legend />
          {/* Generate bars for each property */}
          {properties.map((_, index) => (
            <Bar
              key={`property-${index}`}
              dataKey={propertyNames[index]}
              fill={colors[index % colors.length]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PropertyResultsDiagram;
