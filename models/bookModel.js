const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: true,
    match: [
      /^[a-zA-Z0-9]+$/,
      "Only alphanumeric characters are allowed for the title.",
    ],
  },
  category: {
    type: String,
    required: true,
    match: [/^[a-zA-Z]+$/, "Lastname cannot contain numeric values"],
  },
  title: {
    type: String,
    required: true,
    match: [
      /^[a-zA-Z0-9\s]+$/,
      "Only alphanumeric characters are allowed for the title.",
    ],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "author",
  },
  likes: {
    type: Number,
    default: 0,
    required: true,
  },
});

const Book = mongoose.model("book", bookSchema);
module.exports = Book;
