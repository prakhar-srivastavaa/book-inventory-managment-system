// NotFound Page (404) - Shown when user tries to access a page that doesn't exist
// In React Router, this is the catch-all route for invalid URLs

import React from 'react';
import { Link } from 'react-router-dom'; // For navigating back to home
import '../styles/NotFound.css'; // Styles for the 404 page

const NotFound = () => {
    return (
        <div className="not-found">
            <div className="not-found-content">
                {/* 404 Error Code */}
                <h1>404</h1>
                
                {/* Error Message */}
                <h2>Page Not Found</h2>
                <p>The page you're looking for doesn't exist.</p>
                
                {/* Link back to home page */}
                <Link to="/" className="btn btn-primary">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
