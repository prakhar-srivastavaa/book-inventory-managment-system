// BookDetails - Shows the complete information for a single book
// This page is accessed by clicking a book title in the BookList table
// The book ID comes from the URL (e.g., /book/1)

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Hooks for URL params and navigation
import { getBookById } from '../services/bookService'; // Function to fetch single book
import '../styles/BookDetails.css'; // Styles for this page

const BookDetails = () => {
    // useParams() - Extracts URL parameters
    // Example: /book/1 → { id: '1' }
    const { id } = useParams();
    
    // useNavigate() - Hook to programmatically navigate to different pages
    const navigate = useNavigate();
    
    // State to store the book data
    const [book, setBook] = useState(null);
    
    // State to show loading message while fetching from API
    const [loading, setLoading] = useState(true);
    
    // State to store error messages if fetch fails
    const [error, setError] = useState(null);

    // useEffect - Runs when component mounts or when 'id' changes
    // This fetches the book data from the mock API
    useEffect(() => {
        // Define async function to fetch book (can't use async directly in useEffect)
        const fetchBook = async () => {
            try {
                setLoading(true);
                
                // Call the API service to get book by ID
                const bookData = await getBookById(id);
                
                // Save book data to state
                setBook(bookData);
                
                // Clear any previous errors
                setError(null);
            } catch (err) {
                // If there's an error, save it to state
                setError(err.message);
                setBook(null);
            } finally {
                // Done loading (whether success or error)
                setLoading(false);
            }
        };

        // Call the fetch function
        fetchBook();
    }, [id]); // Re-run if the book ID in URL changes

    // Show loading message while fetching data
    if (loading) {
        return <div className="loading">Loading book details...</div>;
    }

    // Show error message if fetch failed
    if (error || !book) {
        return (
            <div className="error-container">
                <p className="error-message">Error: {error || 'Book not found'}</p>
                {/* navigate('/') goes back to home page */}
                <button className="btn btn-primary" onClick={() => navigate('/')}>
                    Back to Home
                </button>
            </div>
        );
    }

    // If we reach here, book data loaded successfully - show the details
    return (
        <div className="book-details">
            {/* Back button to return to book list */}
            <button className="btn btn-back" onClick={() => navigate('/')}>
                ← Back to Books
            </button>

            <div className="details-container">
                {/* Book title and author at the top */}
                <div className="details-header">
                    <h1>{book.title}</h1>
                    <p className="author">by {book.author}</p>
                </div>

                {/* Grid layout for book metadata */}
                <div className="details-grid">
                    <div className="detail-item">
                        <label>Publisher:</label>
                        <p>{book.publisher}</p>
                    </div>

                    {/* Format date in readable format (e.g., "January 15, 2023") */}
                    <div className="detail-item">
                        <label>Published Date:</label>
                        <p>{new Date(book.publishedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</p>
                    </div>

                    <div className="detail-item">
                        <label>Number of Pages:</label>
                        <p>{book.pages}</p>
                    </div>

                    <div className="detail-item">
                        <label>Language:</label>
                        <p>{book.language}</p>
                    </div>
                </div>

                {/* Full book description/overview */}
                <div className="overview-section">
                    <h3>Overview</h3>
                    <p>{book.overview}</p>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
