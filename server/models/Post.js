const mongoose = require('mongoose');

const schema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  place_id: String,
  caption: String,
  images: [String],
  like_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Like',
  }],
  comment_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
    select: false
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
    select: false
  },
});

module.exports = mongoose.model('Post', schema);
