const mongoose = require('mongoose');

const schema = mongoose.Schema({
  imageUrl: String,
  PlaceId: String,
});

module.exports = mongoose.model('PlaceImage', schema);
