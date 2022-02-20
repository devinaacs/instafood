const mongoose = require('mongoose');

const schema = mongoose.Schema({
  draft: {
    type: Number,
  },
  ready: {
    type: Number,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('TrendingVersion', schema);
