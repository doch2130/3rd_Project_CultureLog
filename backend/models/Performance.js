const mongoose = require('mongoose');

const performanceSchema = mongoose.Schema({
  date: {
    type: String,
  },
  title: {
    type: String,
  },
  hall: {
    type: String,
  },
  mainroll: {
    type: String,
  },
  review: {
    type: String,
  },
});
const Performance = mongoose.model('Performance', performanceSchema);
module.exports = { Performance };
