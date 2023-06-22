const Author = require("../models/authorModel");
const Book = require("../models/bookModel");
const logger = require("../utils/loggerUtil");

const addBook = async (ctx) => {
  try {
    const { isbn, category, title, author } = ctx.request.body;

    // Check if ISBN already exists
    const existingBook = await Book.findOne({ isbn: isbn });
    if (existingBook) {
      return (ctx.body = { error: "ISBN already exists." });
    }

    const book = await Book.create({
      isbn: isbn,
      category: category,
      title: title,
      author: author,
    });

    logger.info(`Book ${book._id} added`);
    return (ctx.body = book);
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

const likeBook = async (ctx) => {
  try {
    const isbn = ctx.request.body.isbn;

    // Check if ISBN already exists
    const existingBook = await Book.findOne({ isbn: isbn });
    if (!existingBook) {
      return (ctx.body = { error: "Invalid ISBN." });
    }
    const book = await Book.findOneAndUpdate(
      //increments like property
      { isbn: isbn },
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!book) {
      return (ctx.body = { error: "Book not found." });
    }

    logger.info(`Book ${book._id} liked`);
    return (ctx.body = book);
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

const getBook = async (ctx) => {
  try {
    const id = ctx.params.id;
    const book = await Book.findById(id).populate({
      path: "author",
      select: "firstName lastName",
    });
    logger.info(`Book ${book._id} requested`);
    return (ctx.body = book);
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

const getBookByIsbn = async (ctx) => {
  try {
    const isbn = ctx.request.body.isbn;
    const book = await Book.findOne({ isbn: isbn }).populate({
      path: "author",
      select: "firstName lastName",
    });

    logger.info(`Book ${book._id} requested`);
    return (ctx.body = book);
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

const getBooks = async (ctx) => {
  try {
    const books = await Book.find({}).populate({
      path: "author",
      select: "firstName lastName",
    });

    logger.info(`Books requested`);
    return (ctx.body = books);
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

const getBooksByCategory = async (ctx) => {
  try {
    const category = ctx.request.body.category;

    const books = await Book.find({ category: category }).populate({
      path: "author",
      select: "firstName lastName",
    });
    if (books.length < 1) {
      return (ctx.body = { error: "No books available" });
    }
    logger.info(`Books requested`);
    return (ctx.body = books);
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

const deleteBook = async (ctx) => {
  try {
    const id = ctx.params.id;
    const book = await Book.findByIdAndDelete(id);

    logger.info(`Book ${book._id} deleted`);
    return (ctx.body = book);
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

const editBook = async (ctx) => {
  try {
    const id = ctx.params.id;
    const { isbn, category, title, author } = ctx.request.body;

    const book = await Book.findByIdAndUpdate(id, {
      isbn: isbn,
      category: category,
      title: title,
      author: author,
    });

    logger.info(`Book ${book._id} updated`);
    return (ctx.body = book);
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

module.exports = {
  addBook,
  getBook,
  getBooks,
  getBookByIsbn,
  deleteBook,
  editBook,
  likeBook,
  getBooksByCategory,
};
