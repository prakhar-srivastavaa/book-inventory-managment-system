import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById } from '../services/bookService';
import '../styles/BookDetails.css';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true);
                const bookData = await getBookById(id);
                setBook(bookData);
                setError(null);
            } catch (err) {
                setError(err.message);
                setBook(null);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    if (loading) {
        return <div className="loading">Loading book details...</div>;
    }

    if (error || !book) {
        return (
            <div className="error-container">
                <p className="error-message">Error: {error || 'Book not found'}</p>
                <button className="btn btn-primary" onClick={() => navigate('/')}>
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="book-details">
            <button className="btn btn-back" onClick={() => navigate('/')}>
                ← Back to Books
            </button>

            <div className="details-container">
                <div className="details-header">
                    <h1>{book.title}</h1>
                    <p className="author">by {book.author}</p>
                </div>

                <div className="details-grid">
                    <div className="detail-item">
                        <label>Publisher:</label>
                        <p>{book.publisher}</p>
                    </div>

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

                <div className="overview-section">
                    <h3>Overview</h3>
                    <p>{book.overview}</p>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
