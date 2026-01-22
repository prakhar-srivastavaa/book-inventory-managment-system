import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookDetails from './components/BookDetails';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content-app">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className="app-footer">
            <p>&copy; 2025 Book Inventory Management System. All rights reserved by Prakhar.</p>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
