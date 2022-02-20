const mongoose = require('mongoose');

const schema = mongoose.Schema({
  version: {
    type: Number,
    index: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('TrendingPosts', schema);
