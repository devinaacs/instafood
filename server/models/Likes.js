const mongoose = require('mongoose');

const schema = mongoose.Schema({
  UserId: String,
  PostId: String,
});

module.exports = mongoose.model('Like', schema);
