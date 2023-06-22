const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    match: [/^[a-zA-Z]+$/, "Firstname cannot contain numeric values"],
  },
  lastName: {
    type: String,
    required: true,
    match: [/^[a-zA-Z]+$/, "Lastname cannot contain numeric values"],
  },
  email: {
    type: String,
    required: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address.",
    ],
  },
  contactNo: {
    type: String,
    required: true,
    match: [/^[0-9]+$/, "Invalid contact number"],
    maxlength: [10, "Contact number should not exceed 10 digits."],
  },
});

const Author = mongoose.model("author", authorSchema);
module.exports = Author;
