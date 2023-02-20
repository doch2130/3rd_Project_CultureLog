const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const performanceSchema = mongoose.Schema({
  email: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
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
