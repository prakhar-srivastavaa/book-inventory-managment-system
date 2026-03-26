// BookForm - A form component for adding new books or editing existing ones
// This is a "controlled component" meaning React controls the form input values

import React, { useState, useEffect } from 'react';
import { validateBookForm } from '../utils/validation'; // Function to check if form data is valid
import '../styles/BookForm.css'; // Styles for the form

const BookForm = ({ onSubmit, initialBook, isEditing }) => {
    // State to hold all form field values
    // This is called a "controlled component" - the form values are stored in state
    const [book, setBook] = useState({
        title: '',
        author: '',
        publishedDate: '',
        publisher: '',
        overview: '',
        pages: '',
        language: 'English'
    });

    // State to store validation error messages
    // Errors object: { fieldName: 'error message' }
    const [errors, setErrors] = useState({});
    
    // State to show success message after form submit
    const [submitted, setSubmitted] = useState(false);

    // useEffect runs when initialBook prop changes (when editing a book)
    // It fills the form with the book's current data
    useEffect(() => {
        if (initialBook) {
            setBook(initialBook);
        }
    }, [initialBook]); // Re-run only when initialBook changes

    // Handle input changes - updates form state as user types
    const handleChange = (e) => {
        const { name, value } = e.target; // Get field name and new value from input
        
        // Update the specific field while keeping other fields unchanged
        setBook(prev => ({
            ...prev,
            [name]: value // Update the field that changed
        }));
        
        // Clear error message for this field once user starts fixing it
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Handle form submission - validate and save the book
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload on submit
        
        // Validate all form fields using validation utility
        const validationErrors = validateBookForm(book);

        // If there are errors, show them and don't submit
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; // Stop here if validation failed
        }

        // Clear previous errors
        setErrors({});
        
        // Send the form data to parent component (Home.js)
        onSubmit(book);
        
        // Show success message
        setSubmitted(true);

        // Reset form only if adding new book (not editing)
        if (!isEditing) {
            setBook({
                title: '',
                author: '',
                publishedDate: '',
                publisher: '',
                overview: '',
                pages: '',
                language: 'English'
            });
        }
    };

    return (
        <form className="book-form" onSubmit={handleSubmit}>
            {/* Form title changes based on add or edit mode */}
            <h2>{isEditing ? 'Edit Book' : 'Add New Book'}</h2>

            {/* Book Title Field */}
            <div className="form-group">
                <label htmlFor="title">Book Title *</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={book.title}
                    onChange={handleChange}
                    placeholder="Enter book title"
                    className={errors.title ? 'input-error' : ''}
                />
                {/* Show error message if validation failed */}
                {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            {/* Author Field */}
            <div className="form-group">
                <label htmlFor="author">Author *</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={book.author}
                    onChange={handleChange}
                    placeholder="Enter author name"
                    className={errors.author ? 'input-error' : ''}
                />
                {errors.author && <span className="error-message">{errors.author}</span>}
            </div>

            {/* Published Date Field */}
            <div className="form-group">
                <label htmlFor="publishedDate">Published Date *</label>
                <input
                    type="date"
                    id="publishedDate"
                    name="publishedDate"
                    value={book.publishedDate}
                    onChange={handleChange}
                    className={errors.publishedDate ? 'input-error' : ''}
                />
                {errors.publishedDate && <span className="error-message">{errors.publishedDate}</span>}
            </div>

            {/* Publisher Field */}
            <div className="form-group">
                <label htmlFor="publisher">Publisher *</label>
                <input
                    type="text"
                    id="publisher"
                    name="publisher"
                    value={book.publisher}
                    onChange={handleChange}
                    placeholder="Enter publisher name"
                    className={errors.publisher ? 'input-error' : ''}
                />
                {errors.publisher && <span className="error-message">{errors.publisher}</span>}
            </div>

            {/* Pages Field */}
            <div className="form-group">
                <label htmlFor="pages">Number of Pages *</label>
                <input
                    type="number"
                    id="pages"
                    name="pages"
                    value={book.pages}
                    onChange={handleChange}
                    placeholder="Enter number of pages"
                    className={errors.pages ? 'input-error' : ''}
                />
                {errors.pages && <span className="error-message">{errors.pages}</span>}
            </div>

            {/* Language Field */}
            <div className="form-group">
                <label htmlFor="language">Language *</label>
                <input
                    type="text"
                    id="language"
                    name="language"
                    value={book.language}
                    onChange={handleChange}
                    placeholder="Enter language"
                    className={errors.language ? 'input-error' : ''}
                />
                {errors.language && <span className="error-message">{errors.language}</span>}
            </div>

            {/* Overview/Description Field */}
            <div className="form-group">
                <label htmlFor="overview">Overview *</label>
                <textarea
                    id="overview"
                    name="overview"
                    value={book.overview}
                    onChange={handleChange}
                    placeholder="Enter book overview (10-2000 characters)"
                    rows="5"
                    className={errors.overview ? 'input-error' : ''}
                />
                {errors.overview && <span className="error-message">{errors.overview}</span>}
                {/* Show character count for textarea */}
                <span className="char-count">{book.overview.length}/2000</span>
            </div>

            {/* Submit Button */}
            <div className="form-buttons">
                <button type="submit" className="btn btn-primary">
                    {isEditing ? 'Update Book' : 'Add Book'}
                </button>
            </div>

            {/* Success message appears after adding a new book */}
            {submitted && !isEditing && (
                <div className="success-message">Book added successfully!</div>
            )}
        </form>
    );
};

export default BookForm;
