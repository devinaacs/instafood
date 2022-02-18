const mongoose = require('mongoose');

const schema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  place_id: String,
  caption: String,
  images: [String],
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', schema);
