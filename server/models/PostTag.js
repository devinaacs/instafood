const mongoose = require('mongoose');

const schema = mongoose.Schema({
  PostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  tag: String,
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('PostTag', schema);
