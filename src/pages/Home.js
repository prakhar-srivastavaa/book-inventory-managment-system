import React, { useState, useEffect } from 'react';
import BookList from '../components/BookList';
import BookForm from '../components/BookForm';
import { getAllBooks, addBook, updateBook, deleteBook } from '../services/bookService';
import '../styles/Home.css';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const data = await getAllBooks();
            setBooks(data);
            setError(null);
        } catch (err) {
            setError('Failed to load books');
        } finally {
            setLoading(false);
        }
    };

    const handleAddBook = async (book) => {
        try {
            const newBook = await addBook(book);
            setBooks([...books, newBook]);
            setShowForm(false);
            setSuccessMessage('Book added successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError('Failed to add book');
        }
    };

    const handleUpdateBook = async (book) => {
        try {
            const updatedBook = await updateBook(editingBook.id, book);
            setBooks(books.map(b => b.id === editingBook.id ? updatedBook : b));
            setEditingBook(null);
            setShowForm(false);
            setSuccessMessage('Book updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError('Failed to update book');
        }
    };

    const handleDeleteBook = async (id) => {
        try {
            await deleteBook(id);
            setBooks(books.filter(b => b.id !== id));
            setSuccessMessage('Book deleted successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError('Failed to delete book');
        }
    };

    const handleEditBook = (book) => {
        setEditingBook(book);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingBook(null);
    };

    return (
        <div className="home">
            <div className="home-header">
                <h1>Book Inventory Management System</h1>
                <p>Manage your book collection efficiently</p>
            </div>

            {error && <div className="error-banner">{error}</div>}
            {successMessage && <div className="success-banner">{successMessage}</div>}

            <div className="home-container">
                <div className="sidebar">
                    {!showForm && (
                        <button
                            className="btn btn-primary btn-large"
                            onClick={() => setShowForm(true)}
                        >
                            ➕ Add New Book
                        </button>
                    )}

                    {showForm && (
                        <div className="form-section">
                            <BookForm
                                onSubmit={editingBook ? handleUpdateBook : handleAddBook}
                                initialBook={editingBook}
                                isEditing={!!editingBook}
                            />
                            <button
                                className="btn btn-secondary btn-close"
                                onClick={handleCloseForm}
                            >
                                Close Form
                            </button>
                        </div>
                    )}
                </div>

                <div className="main-content">
                    <div className="books-section">
                        <h2>Book Inventory ({books.length} books)</h2>

                        {loading ? (
                            <div className="loading">Loading books...</div>
                        ) : (
                            <BookList
                                books={books}
                                onDelete={handleDeleteBook}
                                onEdit={handleEditBook}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
