const mongoose = require('mongoose');

const schema = mongoose.Schema({
  UserId: String,
  PlaceId: String,
  caption: String,
});

module.exports = mongoose.model('Post', schema);
