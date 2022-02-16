const mongoose = require('mongoose');

const schema = mongoose.Schema({
  UserId: String,
  PostId: String,
  comment: String,
});

module.exports = mongoose.model('Comment', schema);
