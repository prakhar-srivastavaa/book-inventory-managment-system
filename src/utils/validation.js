// validation.js - Utility functions to validate form input
// Each function checks if a specific field has valid data
// These are used in BookForm to show error messages to the user

/**
 * Validate email format
 * Checks for basic email pattern: something@something.something
 */
export const validateEmail = (email) => {
    // Regex pattern: 
    // ^[^\s@]+ : starts with characters that aren't space or @
    // @ : must have @
    // [^\s@]+ : more characters that aren't space or @
    // \. : must have a dot
    // [^\s@]+$ : ends with characters that aren't space or @
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email); // test() returns true or false
};

/**
 * Validate book title
 * Must be between 1 and 200 characters
 */
export const validateTitle = (title) => {
    // trim() removes spaces from beginning and end
    return title.trim().length >= 1 && title.trim().length <= 200;
};

/**
 * Validate author name
 * Must be between 1 and 100 characters
 */
export const validateAuthor = (author) => {
    return author.trim().length >= 1 && author.trim().length <= 100;
};

/**
 * Validate publisher name
 * Must be between 1 and 100 characters
 */
export const validatePublisher = (publisher) => {
    return publisher.trim().length >= 1 && publisher.trim().length <= 100;
};

/**
 * Validate number of pages
 * Must be an integer between 1 and 10000
 */
export const validatePages = (pages) => {
    const num = parseInt(pages); // Convert string to number
    // isNaN() checks if value is NOT a number
    return !isNaN(num) && num > 0 && num <= 10000;
};

/**
 * Validate published date
 * Must be a valid date format
 */
export const validateDate = (dateString) => {
    const date = new Date(dateString); // Try to convert to date
    // Check if it's a valid Date object and not NaN
    return date instanceof Date && !isNaN(date);
};

/**
 * Validate book overview/description
 * Must be between 10 and 2000 characters
 */
export const validateOverview = (overview) => {
    return overview.trim().length >= 10 && overview.trim().length <= 2000;
};

/**
 * Validate language field
 * Must be between 1 and 50 characters
 */
export const validateLanguage = (language) => {
    return language.trim().length >= 1 && language.trim().length <= 50;
};

/**
 * Validate the entire book form
 * Checks all fields and returns an object with error messages
 * 
 * Returns: Object with error messages
 * Example: { title: 'Title is required', author: 'Author is too long' }
 * If no errors, returns empty object {}
 */
export const validateBookForm = (book) => {
    // Create empty object to store error messages
    const errors = {};

    // Check each field using the individual validation functions
    // If validation fails, add error message to errors object

    if (!validateTitle(book.title)) {
        errors.title = "Title must be between 1 and 200 characters";
    }

    if (!validateAuthor(book.author)) {
        errors.author = "Author name must be between 1 and 100 characters";
    }

    if (!validatePublisher(book.publisher)) {
        errors.publisher = "Publisher must be between 1 and 100 characters";
    }

    if (!validatePages(book.pages)) {
        errors.pages = "Pages must be a number between 1 and 10000";
    }

    if (!validateDate(book.publishedDate)) {
        errors.publishedDate = "Please select a valid date";
    }

    if (!validateOverview(book.overview)) {
        errors.overview = "Overview must be between 10 and 2000 characters";
    }

    if (!validateLanguage(book.language)) {
        errors.language = "Language must be between 1 and 50 characters";
    }

    return errors; // Return errors object (empty if no errors)
};
