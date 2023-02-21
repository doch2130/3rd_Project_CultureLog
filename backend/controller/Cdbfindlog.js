const mongoose = require('mongoose');
const { Performance } = require('../models/Performance');
const { Movie } = require('../models/Movie');
const { Book } = require('../models/Book');
const config = require('../config/key');

mongoose
  .connect(config.mongoURI, {})
  .then(() => console.log('mongoDB Connected...'))
  .catch((err) => console.log(err));

exports.fromDB = async (req, res) => {
  console.log('fromperfo', req.query);
  const findMyPerfo = await Performance.find({
    $and: [{ date: req.query.date }, { email: req.query.user }],
  });
  const findMyMovie = await Movie.find({
    $and: [{ date: req.query.date }, { email: req.query.user }],
  });
  const findMyBook = await Book.find({
    $and: [{ date: req.query.date }, { email: req.query.user }],
  });
  console.log('find3', findMyPerfo, findMyBook, findMyMovie);
  let findMylog = [];
  findMylog.push(findMyPerfo, findMyBook, findMyMovie);
  console.log('findMylog', findMylog);
  res.send(findMylog);
};

exports.logOfyear = async (req, res) => {
  console.log('fromlogofyear', req.query);
  const findMyPerfo = await Performance.find({
    $and: [{ date: req.query.date }, { email: req.query.user }],
  });
  const findMyMovie = await Movie.find({
    $and: [{ date: req.query.date }, { email: req.query.user }],
  });
  const findMyBook = await Book.find({
    $and: [{ date: req.query.date }, { email: req.query.user }],
  });
  let findLogOfYear = [];
  findLogOfYear.push(findMyPerfo, findMyBook, findMyMovie);
  console.log('findLogOfYear', findLogOfYear);
};
