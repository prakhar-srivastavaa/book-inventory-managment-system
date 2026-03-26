// Home Page - The main page that manages the entire book inventory
// Shows the book list on the right and form on the left when adding/editing books
// This is where all CRUD (Create, Read, Update, Delete) operations happen

import React, { useState, useEffect } from 'react';
import BookList from '../components/BookList'; // Component to display books in a table
import BookForm from '../components/BookForm'; // Component with form to add/edit books
import { getAllBooks, addBook, updateBook, deleteBook } from '../services/bookService'; // API functions
import '../styles/Home.css'; // Styles for the home page

const Home = () => {
    // State to store all books from the API
    const [books, setBooks] = useState([]);
    
    // State to show loading message while fetching books
    const [loading, setLoading] = useState(true);
    
    // State to show error messages if something goes wrong
    const [error, setError] = useState(null);
    
    // State to show/hide the form (toggled by "Add New Book" button)
    const [showForm, setShowForm] = useState(false);
    
    // State to store which book is being edited (null if adding new)
    const [editingBook, setEditingBook] = useState(null);
    
    // State to show success message after add/update/delete
    const [successMessage, setSuccessMessage] = useState('');

    // useEffect runs once when component mounts
    // It fetches all books from the API
    useEffect(() => {
        fetchBooks();
    }, []); // Empty dependency array means this runs only once

    // Fetch all books from the mock API service
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

    // Handle adding a new book
    // Called when user submits the form in "Add" mode
    const handleAddBook = async (book) => {
        try {
            // Send new book to API and get back the book with ID
            const newBook = await addBook(book);
            
            // Add new book to books array
            setBooks([...books, newBook]);
            
            // Close the form
            setShowForm(false);
            
            // Show success message for 3 seconds
            setSuccessMessage('Book added successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError('Failed to add book');
        }
    };

    // Handle updating an existing book
    // Called when user submits the form in "Edit" mode
    const handleUpdateBook = async (book) => {
        try {
            // Send updated book to API
            const updatedBook = await updateBook(editingBook.id, book);
            
            // Update the book in the books array
            setBooks(books.map(b => b.id === editingBook.id ? updatedBook : b));
            
            // Clear the editing state
            setEditingBook(null);
            
            // Close the form
            setShowForm(false);
            
            // Show success message for 3 seconds
            setSuccessMessage('Book updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError('Failed to update book');
        }
    };

    // Handle deleting a book
    // Called when user clicks "Delete" button in the table
    const handleDeleteBook = async (id) => {
        try {
            // Send delete request to API
            await deleteBook(id);
            
            // Remove the book from the books array
            setBooks(books.filter(b => b.id !== id));
            
            // Show success message for 3 seconds
            setSuccessMessage('Book deleted successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError('Failed to delete book');
        }
    };

    // Handle edit button click in the table
    // Opens the form with the book's current data
    const handleEditBook = (book) => {
        setEditingBook(book);
        setShowForm(true);
    };

    // Close the form and clear editing state
    const handleCloseForm = () => {
        setShowForm(false);
        setEditingBook(null);
    };

    return (
        <div className="home">
            {/* Page header with title and description */}
            <div className="home-header">
                <h1>Book Inventory Management System</h1>
                <p>Manage your book collection efficiently</p>
            </div>

            {/* Error message banner - shows if something goes wrong */}
            {error && <div className="error-banner">{error}</div>}
            
            {/* Success message banner - shows after add/update/delete */}
            {successMessage && <div className="success-banner">{successMessage}</div>}

            <div className="home-container">
                {/* Sidebar with form on the left */}
                <div className="sidebar">
                    {/* Show "Add New Book" button when form is closed */}
                    {!showForm && (
                        <button
                            className="btn btn-primary btn-large"
                            onClick={() => setShowForm(true)}
                        >
                            ➕ Add New Book
                        </button>
                    )}

                    {/* Show form when user clicks "Add New Book" or "Edit" */}
                    {showForm && (
                        <div className="form-section">
                            {/* 
                                Pass different onSubmit handler based on mode:
                                - Adding: handleAddBook
                                - Editing: handleUpdateBook
                            */}
                            <BookForm
                                onSubmit={editingBook ? handleUpdateBook : handleAddBook}
                                initialBook={editingBook} // For edit mode, pre-fill form
                                isEditing={!!editingBook} // true if editing, false if adding
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

                {/* Main content with book list on the right */}
                <div className="main-content">
                    <div className="books-section">
                        {/* Show count of books */}
                        <h2>Book Inventory ({books.length} books)</h2>

                        {/* 
                            Show loading message while fetching,
                            otherwise show the book list table
                        */}
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
