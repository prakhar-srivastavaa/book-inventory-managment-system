export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateTitle = (title) => {
    return title.trim().length >= 1 && title.trim().length <= 200;
};

export const validateAuthor = (author) => {
    return author.trim().length >= 1 && author.trim().length <= 100;
};

export const validatePublisher = (publisher) => {
    return publisher.trim().length >= 1 && publisher.trim().length <= 100;
};

export const validatePages = (pages) => {
    const num = parseInt(pages);
    return !isNaN(num) && num > 0 && num <= 10000;
};

export const validateDate = (dateString) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
};

export const validateOverview = (overview) => {
    return overview.trim().length >= 10 && overview.trim().length <= 2000;
};

export const validateLanguage = (language) => {
    return language.trim().length >= 1 && language.trim().length <= 50;
};

export const validateBookForm = (book) => {
    const errors = {};

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

    return errors;
};
