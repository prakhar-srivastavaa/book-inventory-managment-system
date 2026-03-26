// bookService - Mock API Service
// This simulates a backend API using JavaScript
// In a real app, these functions would call a real server
// The setTimeout creates a 300ms delay to simulate network latency

// In-memory database - stores all books
// In a real app, this would be stored on a server
let books = [
    {
        id: 1,
        title: "Shiv Sutra",
        author: "Osho",
        publishedDate: "1982-01-01",
        publisher: "Neo-Osho Series",
        overview: "A spiritual and philosophical work that explores the nature of consciousness and existence. The text presents Osho's interpretation of the ancient Sanskrit aphorisms (Shiva Sutras) originally devised by Pāṇini for grammatical purposes, translated here into spiritual wisdom about the human condition and enlightenment.",
        pages: 256,
        language: "English"
    },
    {
        id: 2,
        title: "The Power of the Subconscious Mind",
        author: "Joseph Murphy",
        publishedDate: "1963-01-01",
        publisher: "Prentice Hall",
        overview: "A revolutionary guide to unlocking the unlimited powers of your subconscious mind. Through practical techniques and real-life examples, the book demonstrates how to harness the incredible potential of your subconscious mind to achieve success, health, happiness, and prosperity in all areas of life.",
        pages: 304,
        language: "English"
    },
    {
        id: 3,
        title: "Book of Secrets",
        author: "Osho",
        publishedDate: "1998-01-01",
        publisher: "St. Martin's Press",
        overview: "A comprehensive collection of Osho's intimate conversations about life's deepest questions. The book provides practical wisdom and meditative insights on how to live a fulfilling life, addressing topics like love, spirituality, meditation, and personal transformation with Osho's characteristic eloquence and humor.",
        pages: 464,
        language: "English"
    },
    {
        id: 4,
        title: "Rich Dad Poor Dad",
        author: "Robert T. Kiyosaki and Sharon Lechter",
        publishedDate: "1997-04-01",
        publisher: "Warner Books",
        overview: "A bestselling personal finance book that contrasts the financial philosophies of two fathers - one wealthy entrepreneur and one highly educated but struggling financially. The book teaches fundamental concepts about money, investing, assets versus liabilities, and building wealth through entrepreneurship and smart financial decisions.",
        pages: 336,
        language: "English"
    },
    {
        id: 5,
        title: "The Polyester Prince",
        author: "Hamish McDonald",
        publishedDate: "1998-01-01",
        publisher: "Allen & Unwin",
        overview: "A comprehensive biography of Dhirubhai Ambani, the founder of Reliance Industries, chronicling his rise from humble beginnings to becoming one of India's most powerful businessmen. The book explores his business acumen, controversial methods, political connections, and the impact of his legacy on Indian entrepreneurship and industry.",
        pages: 297,
        language: "English"
    }
];

/**
 * GET - Get all books from the database
 * Returns: Promise that resolves to array of all books
 * Simulates: Fetching data from a backend API
 */
export const getAllBooks = () => {
    return new Promise((resolve) => {
        // setTimeout simulates network delay (300ms)
        setTimeout(() => {
            // Spread operator [...books] creates a copy so original array isn't modified
            resolve([...books]);
        }, 300);
    });
};

/**
 * GET - Get a single book by its ID
 * Parameters: id - the book ID to fetch
 * Returns: Promise that resolves to the book object or rejects if not found
 */
export const getBookById = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // parseInt(id) converts string ID to number for comparison
            // find() returns first item that matches the condition
            const book = books.find(b => b.id === parseInt(id));
            if (book) {
                // Return a copy of the book (spread operator {...book})
                resolve({ ...book });
            } else {
                // If book not found, reject the promise with an error
                reject(new Error("Book not found"));
            }
        }, 300);
    });
};

/**
 * POST - Add a new book to the database
 * Parameters: book - the book object with title, author, etc. (without ID)
 * Returns: Promise that resolves to the new book with an ID assigned
 */
export const addBook = (book) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Generate new ID: take the highest existing ID and add 1
            // Math.max(...array) gets the largest number from the array
            const newBook = {
                ...book, // Copy all properties from the input book
                id: Math.max(...books.map(b => b.id), 0) + 1 // Assign new unique ID
            };
            // Add the new book to the array
            books.push(newBook);
            resolve(newBook);
        }, 300);
    });
};

/**
 * PUT/PATCH - Update an existing book
 * Parameters: id - book ID to update, updatedBook - new book data
 * Returns: Promise that resolves to the updated book or rejects if not found
 */
export const updateBook = (id, updatedBook) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // findIndex() returns the position of the item in the array
            const index = books.findIndex(b => b.id === parseInt(id));
            if (index !== -1) {
                // Item found at this index
                // Update the book by merging old data with new data
                // The spread operator ensures the ID stays the same
                books[index] = { ...books[index], ...updatedBook, id: parseInt(id) };
                resolve(books[index]);
            } else {
                // Item not found
                reject(new Error("Book not found"));
            }
        }, 300);
    });
};

/**
 * DELETE - Remove a book from the database
 * Parameters: id - book ID to delete
 * Returns: Promise that resolves to the deleted book or rejects if not found
 */
export const deleteBook = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = books.findIndex(b => b.id === parseInt(id));
            if (index !== -1) {
                // splice() removes 1 item at the given index
                // [0] gets the deleted item from the array that splice returns
                const deletedBook = books.splice(index, 1)[0];
                resolve(deletedBook);
            } else {
                reject(new Error("Book not found"));
            }
        }, 300);
    });
};
