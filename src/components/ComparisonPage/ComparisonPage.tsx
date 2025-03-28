import React from 'react';
import { Property } from '../../types/property';

interface ComparisonPageProps {
  properties: Property[];
  handlePropertyDataChange: (propertyId: string, group: string, field: string, value: any) => void;
}

export const ComparisonPage: React.FC<ComparisonPageProps> = ({ 
  properties, 
  handlePropertyDataChange 
}) => {
  return (
    <div>
      {properties.map((property) => (
        <div key={property.id}>
          {/* Existing Financials group */}
          {/* Existing Details group */}
        </div>
      ))}
    </div>
  );
}; 