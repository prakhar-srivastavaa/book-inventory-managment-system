// ThemeContext - Manages dark/light mode for the entire app
// This allows any component to access and toggle the theme
// Think of it as a "global state" for theme settings

import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context object (like a container for theme data)
const ThemeContext = createContext();

// Custom hook - allows components to easily use the theme
// Usage: const { isDarkMode, toggleTheme } = useTheme();
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

// ThemeProvider - Component that provides theme to all child components
export const ThemeProvider = ({ children }) => {
    // State to track if dark mode is on or off
    // Initialize it from localStorage (saves theme preference)
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        // If theme was saved, use it; otherwise default to dark mode (true)
        return savedTheme ? savedTheme === 'dark' : true;
    });

    // useEffect runs whenever isDarkMode changes
    // It updates the saved theme and applies CSS class to body
    useEffect(() => {
        // Save theme preference to localStorage so it persists after page refresh
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        
        // Add smooth transition effect when switching themes
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        
        // Apply 'dark-mode' class to body tag (CSS styles use this class)
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]); // Re-run whenever isDarkMode changes

    // Function to toggle between dark and light mode
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Provide theme data to all components that use useTheme()
    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
