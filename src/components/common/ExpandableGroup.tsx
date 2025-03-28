import React, { useState } from 'react';

interface ExpandableGroupProps {
  title: string;
  children: React.ReactNode;
}

export const ExpandableGroup: React.FC<ExpandableGroupProps> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div style={{ border: '1px solid #ccc', marginBottom: '1rem' }}>
      <div 
        style={{ 
          padding: '1rem', 
          backgroundColor: '#f5f5f5', 
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 style={{ margin: 0 }}>{title}</h3>
        <span>{isExpanded ? '▼' : '▶'}</span>
      </div>
      {isExpanded && (
        <div style={{ padding: '1rem' }}>
          {children}
        </div>
      )}
    </div>
  );
}; 