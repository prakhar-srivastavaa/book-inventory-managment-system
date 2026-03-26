// BookList - Displays all books in a table with edit/delete options
// The table has a modern look with hover effects

import React from 'react';
import { Link } from 'react-router-dom'; // For navigating to book detail page
import '../styles/BookList.css'; // Styles for the table

const BookList = ({ books, onDelete, onEdit }) => {
    // If there are no books, show an empty state message
    if (books.length === 0) {
        return (
            <div className="empty-state">
                <p>No books found. Add a new book to get started!</p>
            </div>
        );
    }

    return (
        <div className="book-list-container">
            <div className="table-wrapper">
                <table className="books-table">
                    {/* Table Header - Column titles */}
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Publisher</th>
                            <th>Published Date</th>
                            <th>Pages</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    
                    {/* Table Body - Book data */}
                    <tbody>
                        {/* 
                            .map() - Loops through books array and creates a table row for each book
                            key={book.id} - React uses this to track which items have changed
                        */}
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                
                                {/* 
                                    Link component - Makes the title clickable to view full details
                                    `/book/${book.id}` - URL pattern with the book's ID
                                    Example: /book/1, /book/2, etc.
                                */}
                                <td>
                                    <Link to={`/book/${book.id}`} className="book-link">
                                        {book.title}
                                    </Link>
                                </td>
                                
                                <td>{book.author}</td>
                                <td>{book.publisher}</td>
                                
                                {/* Convert date string to readable format (MM/DD/YYYY) */}
                                <td>{new Date(book.publishedDate).toLocaleDateString()}</td>
                                
                                <td>{book.pages}</td>
                                
                                {/* Edit and Delete buttons */}
                                <td className="actions-cell">
                                    {/* 
                                        Edit button - Calls onEdit with the book object
                                        This sends the book data back to Home.js to populate the form
                                    */}
                                    <button
                                        className="btn btn-sm btn-edit"
                                        onClick={() => onEdit(book)}
                                        title="Edit book"
                                    >
                                        Edit
                                    </button>
                                    
                                    {/* 
                                        Delete button - Calls onDelete with the book ID
                                        This removes the book from the list
                                    */}
                                    <button
                                        className="btn btn-sm btn-delete"
                                        onClick={() => onDelete(book.id)}
                                        title="Delete book"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookList;
