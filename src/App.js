// Main App Component - This is the root component of our application
// It sets up routing (different pages) and provides dark mode functionality to the entire app

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// ThemeProvider - Allows all components to access dark/light mode
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookDetails from './components/BookDetails';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    // ThemeProvider wraps everything so all components can use dark/light mode
    <ThemeProvider>
      {/* Router enables navigation between different pages */}
      <Router>
        <div className="App">
          {/* Navbar - Shows at top of every page */}
          <Navbar />

          {/* Main content area - Different pages appear here based on URL */}
          <main className="main-content-app">
            <Routes>
              {/* Route 1: / = Home page (Book inventory) */}
              <Route path="/" element={<Home />} />

              {/* Route 2: /book/:id = Book detail page (shows full details of one book) */}
              {/* :id means it can be any book ID like /book/1 or /book/2 */}
              <Route path="/book/:id" element={<BookDetails />} />

              {/* Route 3: * = 404 Page (shows when user visits a URL that doesn't exist) */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Footer - Shows at bottom of every page */}
          <footer className="app-footer">
            <p>&copy; 2025 Book Inventory Management System. All rights reserved by Prakhar.</p>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
