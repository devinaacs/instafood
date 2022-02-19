const mongoose = require('mongoose');

const schema = mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  PostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('Like', schema);
