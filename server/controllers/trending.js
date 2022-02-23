const TrendingPosts = require('../models/TrendingPosts');
const TrendingTag = require('../models/TrendingTag');
const TrendingPlace = require('../models/TrendingPlace');
const actTrendingVersion = require('../actions/trendingVersion');
const actPlace = require('../actions/place');

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
        populate: [
          {
            path: 'user',
            select: { username: 1, image_url: 1 }
          },
          {
            path: 'like_ids',
            select: { user: 1 }
          },
          {
            path: 'comment_ids',
            select: { comment: 1 },
            populate: {
              path: 'user',
              select: { username: 1, image_url: 1 },
            }
          }
        ]
      });

      trending = trending.posts
        .filter(v => v != null)
        .map(v => {
          v = v.toObject();
          v.id = v._id;
          delete v._id;

          if (v.user && v.user._id) {
            v.user.id = v.user._id;
            delete v.user._id;
          }

          v.likes = v.like_ids.map(like => {
            like.id = like._id;
            delete like._id;
            
            return like;
          });
          delete v.like_ids;

          v.comments = v.comment_ids.map(comment => {
            comment.id = comment._id;
            delete comment._id;

            if (comment.user) {
              comment.user.id = comment.user._id;
              delete comment.user._id;
            }

            return comment;
          });
          delete v.comment_ids;

          return v;
        });

      const promises = [];
      trending.forEach(post => {
        const p = actPlace.getPlaceDetail(post.place_id)
          .then(place => {
            post.place_name = place.name;

            return Promise.resolve();
          })
          .catch(err => {
            console.log(err);
            post.place_name = '';

            return Promise.resolve();
          });

        promises.push(p);
      });
      await Promise.all(promises)
        .catch(err => {
          console.log(err);

          return Promise.resolve();
        });

      res.json(trending);
    } catch (err) {
      console.log(err);
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
      console.log('err', err);
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
