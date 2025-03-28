# Property Comparison Tool

## Project Overview
This React-based web application allows users to compare multiple properties based on various criteria. It provides a comprehensive tool for real estate analysis, helping users make informed decisions about property investments.

## Project Structure
- src/
  - components/: React components
  - styles/: CSS files for styling
  - utils/: Utility functions and helpers
  - types/: TypeScript type definitions
  - data/: Static data and configurations
- public/: Public assets and index.html

## Key Components
- App.tsx: Main application component, handles routing and global state
- LandingPage.tsx: Initial page users see, introduces the tool
- PropertyComparison.tsx: Core comparison functionality
- PropertyForm.tsx: Form for inputting property data
- ResultsTable.tsx: Displays comparison results
- PropertyResultsDiagram.tsx: Visual representation of property scores
- PropertySubgroupDiagram.tsx: Detailed breakdown of property subgroup scores
- Settings.tsx: User preferences and application settings

## State Management
- Using React hooks (useState, useEffect) for local component state
- No global state management library (consider adding Redux or Context API for future scaling)

## Key Features
- Compare multiple properties (up to 10)
- Customizable criteria for property evaluation
- Visual result representation through charts and diagrams
- Dark mode support
- Responsive design for mobile and desktop use
- Test data generation for quick demos

## Data Flow
1. User inputs property data via PropertyForm
2. Data is stored in the App component's state
3. Calculations are performed in utility functions
4. Results are displayed in ResultsTable and various diagram components

## Styling
- CSS modules for component-specific styles
- Global styles defined in App.css
- Responsive design using media queries

## Future Enhancements
- Implement user authentication and accounts
- Add data persistence (database integration)
- Enhance data visualization with more chart types
- Implement property deletion functionality
- Add export feature for comparison results
- Integrate with real estate APIs for automated data fetching

## Getting Started
1. Clone the repository
2. Run `npm install` to install dependencies
3. Use `npm start` to run the development server
4. Navigate to `http://localhost:3000` in your browser

## Contributing
Contributions are welcome! Please read the CONTRIBUTING.md file (to be created) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
