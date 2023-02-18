const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  date: {
    type: String,
  },
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  genre: {
    type: String,
  },
  review: {
    type: String,
  },
});
const Book = mongoose.model('Book', bookSchema);
module.exports = { Book };
