const TrendingVersion = require('../models/TrendingVersion');

let trendingVersion = null;

module.exports = {
  async instance() {
    if (trendingVersion) {
      return trendingVersion;
    }

    trendingVersion = await TrendingVersion.findOne({});

    if (!trendingVersion) {
      trendingVersion = await TrendingVersion.create({
        draft: 1,
        ready: 0,
      });
    }

    return trendingVersion;
  },

  async draftVersion() {
    const tv = await this.instance();

    return tv.draft;
  },

  async readyVersion() {
    const tv = await this.instance();

    return tv.ready;
  },

  async shiftVersion() {
    trendingVersion = await TrendingVersion.findOneAndUpdate(
      {},
      {
        draft: (trendingVersion.draft % 2) + 1,
        ready: (trendingVersion.ready % 2) + 1,
        updated_at: new Date(),
      },
      { new: true }
    );

    return trendingVersion;
  },
};
