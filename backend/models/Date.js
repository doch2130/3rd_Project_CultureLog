const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const dateSchema = mongoose.Schema({
  date: String,
});

const Date = mongoose.model('Date', dateSchema);
module.exports = { Date };
