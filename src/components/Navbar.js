// Navbar - The navigation bar that appears at the top of every page
// It shows the app title and a button to toggle between dark/light mode

import React from 'react';
import { Link } from 'react-router-dom'; // React Router Link for client-side navigation
import { useTheme } from '../context/ThemeContext'; // Hook to access theme state
import '../styles/Navbar.css'; // Styles for the navbar

const Navbar = () => {
    // Get theme state from the global theme context
    // isDarkMode: true if dark mode is on
    // toggleTheme: function to switch between dark and light mode
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* 
                    Link component - navigates to home page without refreshing
                    Different from <a> tag which reloads the whole page
                */}
                <Link to="/" className="navbar-logo">
                    📚 Book Inventory
                </Link>
                
                {/* 
                    Theme toggle button - switches between dark and light mode
                    Shows sun emoji (☀️) in dark mode, moon emoji (🌙) in light mode
                    onClick calls toggleTheme which changes isDarkMode in context
                */}
                <button 
                    className="theme-toggle" 
                    onClick={toggleTheme} 
                    title="Toggle Dark Mode"
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
