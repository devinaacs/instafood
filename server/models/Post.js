const mongoose = require('mongoose');

const schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
  place_id: {
    type: String,
    index: true,
  },
  caption: {
    type: String,
  },
  images: [String],
  tags: {
    type: [String],
    index: true,
  },
  like_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Like',
    },
  ],
  comment_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
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

schema.index({ created_at: -1 });

module.exports = mongoose.model('Post', schema);
