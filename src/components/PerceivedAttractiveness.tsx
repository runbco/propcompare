import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PropertyData } from '../types/types';
import ExpandableDiagram from './ExpandableDiagram';

// Define the props interface for the PerceivedAttractiveness component
interface PerceivedAttractivenessProps {
  properties: PropertyData[];
  propertyNames: string[];
}

// PerceivedAttractiveness component: Renders an area chart comparing perceived attractiveness of properties
const PerceivedAttractiveness: React.FC<PerceivedAttractivenessProps> = ({ properties, propertyNames }) => {
  // Generate mock data for all properties
  // TODO: Replace this with actual data from the properties prop
  const data = [1, 2, 3, 4, 5].map(scale => {
    const dataPoint: { [key: string]: number } = { scale };
    propertyNames.forEach((name, index) => {
      // Assign random values for each property (0-14)
      dataPoint[name] = Math.floor(Math.random() * 15);
    });
    return dataPoint;
  });

  return (
    <ExpandableDiagram title="Perceived Attractiveness Comparison">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="scale" label={{ value: 'Attractiveness Scale', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: 'Percentage of People', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          {/* Render an Area component for each property */}
          {propertyNames.map((name, index) => (
            <Area 
              key={name} 
              type="monotone" 
              dataKey={name} 
              // Generate a unique color for each property based on its index
              stroke={`hsl(${(index * 360) / propertyNames.length}, 70%, 50%)`} 
              fill={`hsl(${(index * 360) / propertyNames.length}, 70%, 50%)`} 
              fillOpacity={0.3}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </ExpandableDiagram>
  );
};

export default PerceivedAttractiveness;
