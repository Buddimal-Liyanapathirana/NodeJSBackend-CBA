const Author = require("../models/authorModel");
const Book = require("../models/bookModel");

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

    return (ctx.body = book);
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

const likeBook = async (ctx) => {
  try {
    const isbn = ctx.request.body.isbn;
    const book = await Book.findOneAndUpdate(
      { isbn: isbn },
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!book) {
      return (ctx.body = { error: "Book not found." });
    }

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
    return (ctx.body = books);
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};
const deleteBook = async (ctx) => {
  try {
    const id = ctx.params.id;
    const book = await Book.findByIdAndDelete(id);
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
};
