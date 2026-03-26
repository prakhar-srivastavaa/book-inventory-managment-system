// Entry Point - This is the first file that runs when the app starts
// It renders the App component into the HTML page

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global CSS styles
import App from './App'; // Main App component

// Find the HTML element with id="root" and create a React root there
// This is where our entire React app will be mounted
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
// React.StrictMode checks for potential problems in the code (only in development)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
