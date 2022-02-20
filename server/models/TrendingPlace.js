const mongoose = require('mongoose');

const schema = mongoose.Schema({
  version: {
    type: Number,
  },
  place_id: {
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

schema.index({ version: 1, place_id: 1 });
schema.index({ version: 1, popularity: -1 });

module.exports = mongoose.model('TrendingPlace', schema);
