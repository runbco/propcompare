import React, { useState, ReactNode } from 'react';

// Define the props interface for the ExpandableDiagram component
interface ExpandableDiagramProps {
  title: string;
  children: ReactNode;
}

// ExpandableDiagram component: Renders a collapsible/expandable container for diagrams
const ExpandableDiagram: React.FC<ExpandableDiagramProps> = ({ title, children }) => {
  // State to track whether the diagram is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    // Container div with dynamic class based on expansion state
    <div className={`chart-container ${isExpanded ? 'expanded' : ''}`}>
      <div className="chart-header">
        <h3>{title}</h3>
        {/* Toggle button to expand/collapse the diagram */}
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      {/* Content area for the diagram */}
      <div className="chart-content">
        {children}
      </div>
    </div>
  );
};

export default ExpandableDiagram;
