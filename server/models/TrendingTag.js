const mongoose = require('mongoose');

const schema = mongoose.Schema({
  version: {
    type: Number,
  },
  tag: {
    type: String,
  },
  popularity: {
    type: Number,
  },
  most_popular: {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    popularity: {
      type: Number,
    },
  },
});

schema.index({ version: 1, tag: 1 });
schema.index({ version: 1, popularity: -1 });

module.exports = mongoose.model('TrendingTag', schema);
