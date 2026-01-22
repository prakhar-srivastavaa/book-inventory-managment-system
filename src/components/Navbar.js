import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import '../styles/Navbar.css';

const Navbar = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    📚 Book Inventory
                </Link>
                <button className="theme-toggle" onClick={toggleTheme} title="Toggle Dark Mode">
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
