const mongoose = require('mongoose');

const schema = mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
    // select: false,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
    select: false
  },
});

module.exports = mongoose.model('Like', schema);
