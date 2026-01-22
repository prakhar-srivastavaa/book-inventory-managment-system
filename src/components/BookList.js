import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/BookList.css';

const BookList = ({ books, onDelete, onEdit }) => {
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
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>
                                    <Link to={`/book/${book.id}`} className="book-link">
                                        {book.title}
                                    </Link>
                                </td>
                                <td>{book.author}</td>
                                <td>{book.publisher}</td>
                                <td>{new Date(book.publishedDate).toLocaleDateString()}</td>
                                <td>{book.pages}</td>
                                <td className="actions-cell">
                                    <button
                                        className="btn btn-sm btn-edit"
                                        onClick={() => onEdit(book)}
                                        title="Edit book"
                                    >
                                        Edit
                                    </button>
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
