const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  date: {
    type: String,
  },
  title: {
    type: String,
  },
  director: {
    type: String,
  },
  actor: {
    type: String,
  },
  review: {
    type: String,
  },
});
const Movie = mongoose.model('Movie', movieSchema);
module.exports = { Movie };
