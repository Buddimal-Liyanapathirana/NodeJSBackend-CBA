const Author = require("../models/authorModel");
const logger = require("../utils/eventLoggerUtil");

const addAuthor = async (ctx) => {
  try {
    const { firstName, lastName, email, contactNo } = ctx.request.body;

    const author = await Author.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      contactNo: contactNo,
    });
    logger.info(`Author ${author._id} added`);
    return (ctx.body = author);
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

const getAuthor = async (ctx) => {
  try {
    const id = ctx.params.id;
    const author = await Author.findById(id);
    logger.info(`Author ${author._id} requested`);
    return (ctx.body = author);
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

const editAuthor = async (ctx) => {
  try {
    const id = ctx.params.id;
    const { firstName, lastName, email, contactNo } = ctx.request.body;

    const author = await Author.findByIdAndUpdate(id, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      contactNo: contactNo,
    });

    logger.info(`Author ${author._id} updated`);
    return (ctx.body = author);
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

const getAuthors = async (ctx) => {
  try {
    const authors = await Author.find({});
    logger.info(`Authors requested`);
    return (ctx.body = authors);
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

const deleteAuthor = async (ctx) => {
  try {
    const id = ctx.params.id;
    const author = await Author.findByIdAndDelete(id);
    logger.info(`Author ${author._id} deleted`);
    return (ctx.body = author);
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

module.exports = { addAuthor, getAuthor, getAuthors, deleteAuthor, editAuthor };
