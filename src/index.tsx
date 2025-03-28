import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Render the main App component wrapped in React.StrictMode
// StrictMode helps identify potential problems in the application
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
