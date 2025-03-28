import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PropertyData } from '../types/types';

// Define the props interface for the IndustryAttractiveness component
interface IndustryAttractivenessProps {
  properties: PropertyData[];
  propertyNames: string[];
  isDarkMode: boolean;
}

// IndustryAttractiveness component: Renders a scatter chart comparing industry attractiveness vs average income
const IndustryAttractiveness: React.FC<IndustryAttractivenessProps> = ({ properties, propertyNames, isDarkMode }) => {
  // Generate mock data for all properties
  // TODO: Replace this with actual data from the properties prop
  const data = propertyNames.map((name, index) => ({
    name,
    attractiveness: Math.random() * 10,
    income: Math.random() * 100000,
    size: Math.random() * 1000
  }));

  return (
    <div className="chart-container">
      <h3>Industry Attractiveness vs Average Income</h3>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis 
            type="number" 
            dataKey="attractiveness" 
            name="Industry Attractiveness" 
            unit="%" 
            label={{ value: 'Industry Attractiveness (%)', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            type="number" 
            dataKey="income" 
            name="Average Income" 
            unit="USD" 
            label={{ value: 'Average Income (USD)', angle: -90, position: 'insideLeft' }}
          />
          <ZAxis type="number" dataKey="size" range={[100, 1000]} name="Property Size" unit="sqft" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          {/* Render a Scatter component for each property */}
          {propertyNames.map((name, index) => (
            <Scatter 
              key={name} 
              name={name} 
              data={[data[index]]} 
              fill={`hsl(${(index * 360) / propertyNames.length}, 70%, 50%)`} 
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IndustryAttractiveness;
