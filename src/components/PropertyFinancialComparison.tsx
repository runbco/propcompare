import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PropertyData } from '../types/types';

// Define the props interface for the component
interface PropertyFinancialComparisonProps {
  properties: PropertyData[];
  propertyNames: string[];
  isDarkMode: boolean;
}

// Define the structure for financial data points
interface FinancialDataPoint {
  name: string;
  [key: string]: string | number;
}

// Main component for comparing financial aspects of properties
const PropertyFinancialComparison: React.FC<PropertyFinancialComparisonProps> = ({ 
  properties, 
  propertyNames, 
  isDarkMode 
}) => {
  // Initialize financial data array with three categories
  const financialData: FinancialDataPoint[] = [
    { name: 'Price' },
    { name: 'Asking Price' },
    { name: 'Anticipated Sales Price' }
  ];

  // Populate financial data for each property
  properties.forEach((property, index) => {
    const propertyName = propertyNames[index];
    financialData[0][propertyName] = property.financials?.price || 0;
    financialData[1][propertyName] = property.financials?.askingPrice || 0;
    financialData[2][propertyName] = property.financials?.anticipatedSalesPrice || 0;
  });

  // Define colors for the bar chart
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE'];

  return (
    <div className={`property-financial-comparison ${isDarkMode ? 'dark-mode' : ''}`}>
      <h3>Property Financial Comparison</h3>
      {/* Responsive container for the bar chart */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={financialData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
          {propertyNames.map((name, index) => (
            <Bar key={name} dataKey={name} fill={colors[index % colors.length]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PropertyFinancialComparison;
