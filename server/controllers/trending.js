const TrendingPosts = require('../models/TrendingPosts');
const TrendingTag = require('../models/TrendingTag');
const TrendingPlace = require('../models/TrendingPlace');
const actTrendingVersion = require('../actions/trendingVersion');

module.exports = {
  async getPosts(req, res, next) {
    try {
      const vReady = await actTrendingVersion.readyVersion();
      let trending = await TrendingPosts.findOne(
        { version: vReady },
        { _id: 0, __v: 0 }
      ).populate({
        path: 'posts',
        select: { __v: 0, updated_at: 0 },
        populate: {
          path: 'user',
          select: { username: 1 },
        }
      });

      if (trending) {
        trending = trending.posts.map(v => {
          v = v.toObject();
          v.id = v._id;
          delete v._id;

          if (v.user && v.user._id) {
            v.user.id = v.user._id;
            delete v.user._id;
          }

          return v;
        });
      }

      res.json(trending);
    } catch (err) {
      next(err);
    }
  },

  async getPlaces(req, res, next) {
    try {
      const vReady = await actTrendingVersion.readyVersion();
      let trending = await TrendingPlace.find(
        { version: vReady },
        { _id: 0, __v: 0 }
      )
        .limit(10)
        .sort({ popularity: -1 })
        .populate({
          path: 'most_popular.post',
          select: ['user', 'images', 'tags'],
          populate: {
            path: 'user',
            select: { username: 1 },
          },
        });

      if (trending) {
        trending = trending.map(v => {
          v = v.toObject();
          v.most_popular.post.id = v.most_popular.post._id;
          delete v.most_popular.post._id;

          v.most_popular.post.user.id = v.most_popular.post.user._id;
          delete v.most_popular.post.user._id;

          return v;
        });
      }

      res.json(trending);
    } catch (err) {
      next(err);
    }
  },

  async getTags(req, res, next) {
    try {
      const vReady = await actTrendingVersion.readyVersion();
      let trending = await TrendingTag.find(
        { version: vReady },
        { _id: 0, __v: 0 }
      )
        .limit(10)
        .sort({ popularity: -1 })
        .populate({
          path: 'most_popular.post',
          select: ['user', 'images', 'tags'],
          populate: {
            path: 'user',
            select: { username: 1 },
          },
        });

      if (trending) {
        trending = trending.map(v => {
          v = v.toObject();
          v.most_popular.post.id = v.most_popular.post._id;
          delete v.most_popular.post._id;

          v.most_popular.post.user.id = v.most_popular.post.user._id;
          delete v.most_popular.post.user._id;

          return v;
        });
      }

      res.json(trending);
    } catch (err) {
      next(err);
    }
  },
};
