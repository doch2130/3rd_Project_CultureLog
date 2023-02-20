const mongoose = require('mongoose');
const { Performance } = require('../models/Performance');
const { Movie } = require('../models/Movie');
const { Book } = require('../models/Book');
const config = require('../config/key');

mongoose
  .connect(config.mongoURI, {})
  .then(() => console.log('mongoDB Connected...'))
  .catch((err) => console.log(err));

exports.fromDBperfo = async (req, res) => {
  console.log('fromperfo', req.query);
  const findDate = await Performance.findOne({ date: req.query.date });
  console.log('finddate', findDate);
  res.send(findDate);
};
