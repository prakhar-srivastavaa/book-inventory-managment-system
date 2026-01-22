import React, { useState, useEffect } from 'react';
import { validateBookForm } from '../utils/validation';
import '../styles/BookForm.css';

const BookForm = ({ onSubmit, initialBook, isEditing }) => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        publishedDate: '',
        publisher: '',
        overview: '',
        pages: '',
        language: 'English'
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (initialBook) {
            setBook(initialBook);
        }
    }, [initialBook]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateBookForm(book);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        onSubmit(book);
        setSubmitted(true);

        // Reset form if not editing
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
            <h2>{isEditing ? 'Edit Book' : 'Add New Book'}</h2>

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
                {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

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
                <span className="char-count">{book.overview.length}/2000</span>
            </div>

            <div className="form-buttons">
                <button type="submit" className="btn btn-primary">
                    {isEditing ? 'Update Book' : 'Add Book'}
                </button>
            </div>

            {submitted && !isEditing && (
                <div className="success-message">Book added successfully!</div>
            )}
        </form>
    );
};

export default BookForm;
