import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PropertyData, propertyGroups } from '../types/types';
import { calculateGroupScores } from '../utils/calculations';

// Define props interface for the component
interface PropertySubgroupDiagramProps {
  properties: PropertyData[];
  selectedGroups: string[];
  isDarkMode: boolean;
  propertyNames: string[];
}

const PropertySubgroupDiagram: React.FC<PropertySubgroupDiagramProps> = ({ 
  properties, 
  selectedGroups, 
  isDarkMode,
  propertyNames
}) => {
  // Calculate scores for each subgroup of a property
  const calculateSubgroupScores = (property: PropertyData) => {
    const scores: { [key: string]: number } = {};
    propertyGroups.forEach(group => {
      group.subGroups.forEach(subGroup => {
        if (selectedGroups.includes(subGroup.name)) {
          let subGroupScore = 0;
          let fieldCount = 0;
          subGroup.fields.forEach(field => {
            if (property[field.id]) {
              subGroupScore += property[field.id].importance * property[field.id].rating;
              fieldCount++;
            }
          });
          scores[subGroup.name] = fieldCount > 0 ? subGroupScore / fieldCount : 0;
        }
      });
    });
    return scores;
  };

  // Calculate subgroup scores for all properties
  const subgroupScores = properties.map(calculateSubgroupScores);

  // Prepare data for the chart
  const data = Object.keys(subgroupScores[0])
    .filter(subgroup => selectedGroups.includes(subgroup))
    .map(subgroup => {
      const dataPoint: { [key: string]: any } = { name: subgroup };
      properties.forEach((_, index) => {
        dataPoint[propertyNames[index]] = Number(subgroupScores[index][subgroup].toFixed(2));
      });
      return dataPoint;
    });

  // Define colors for the bars
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE'];

  return (
    <div className={`property-subgroup-diagram ${isDarkMode ? 'dark-mode' : ''}`} style={{ width: '100%', height: 400 }}>
      <h2>Property Subgroup Scores Comparison</h2>
      {/* Responsive container for the bar chart */}
      <ResponsiveContainer width="100%" height="100%">
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

export default PropertySubgroupDiagram;
