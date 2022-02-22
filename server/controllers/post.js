const fs = require('fs');
const path = require('path');
const Post = require('../models/Post');
const Like = require('../models/Like');
const Comment = require('../models/Comment');
const bucket = require('../helpers/fstorage').getBucket();
const vision = require('@google-cloud/vision');
const actPlace = require('../actions/place');
const client = new vision.ImageAnnotatorClient();

class Controller {
  static async createPost(req, res, next) {
    try {
      const { place_id, caption } = req.body;
      let { tags } = req.body;

      if (typeof tags == 'string') {
        tags = [tags];
      }

      let post = await Post.create({
        user: req.currentUser._id,
        place_id,
        caption,
        tags,
      });

      const images = [];

      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const fileUrl = await uploadFile(post.id, file, i + 1);
        images.push(fileUrl);
        cleanTempFile(file);
      }

      post.images = images;
      await post.save();

      post = post.toObject();
      post.id = post._id;
      post.tags = tags;
      delete post._id;
      delete post.__v;
      delete post.like_ids;
      delete post.comment_ids;
      delete post.updated_at;

      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  }

  static async listPosts(req, res, next) {
    try {
      const filter = {};
      let pageSize = 20;
      let pageNumber = 1;

      if (req.query.place_id) {
        filter.place_id = req.query.place_id;
      }

      if (req.query.user_id) {
        filter.user = req.query.user_id;
      }

      if (req.query.tag) {
        filter.tags = req.query.tag;
      }

      if (req.query.page_size) {
        pageSize = req.query.page_size;
      }

      if (req.query.page_number) {
        pageNumber = req.query.page_number;
      }

      const postsCount = await Post.countDocuments(filter);
      let posts = await Post.find(filter, { __v: 0 })
        .populate({
          path: 'user',
          select: { username: 1 },
        })
        .populate({
          path: 'like_ids',
          select: { user: 1 },
          populate: {
            path: 'user',
            select: { username: 1 },
          },
        })
        .populate({
          path: 'comment_ids',
          select: { comment: 1 },
          populate: {
            path: 'user',
            select: { username: 1 },
          },
        })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ created_at: -1 });

      posts = posts.map(post => {
        post = post.toObject();
        post.id = post._id;

        if (post.user) {
          post.user.id = post.user._id;
          delete post.user._id;
        }

        post.likes = post.like_ids.map(like => ({
          id: like._id,
          user: !like.user
            ? null
            : {
              id: like.user._id,
              username: like.user.username,
            },
        }));

        post.comments = post.comment_ids.map(comment => ({
          id: comment._id,
          comment: comment.comment,
          user: !comment.user
            ? null
            : {
              id: comment.user._id,
              username: comment.user.username,
            },
        }));

        delete post._id;
        delete post.like_ids;
        delete post.comment_ids;

        return post;
      });

      const promises = [];
      posts.forEach(post => {
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
      await Promise.all(promises);

      res.status(200).json({
        pages_count: Math.ceil(postsCount / pageSize),
        items: posts,
      });
    } catch (err) {
      next(err);
    }
  }

  static async findPostById(req, res, next) {
    try {
      let post = await Post.findOne({ _id: req.params.id }, { __v: 0 })
        .populate({
          path: 'user',
          select: { username: 1 },
        })
        .populate({
          path: 'like_ids',
          select: { UserId: 1 },
          populate: {
            path: 'user',
            select: { username: 1 },
          },
        })
        .populate({
          path: 'comment_ids',
          select: { comment: 1 },
          populate: {
            path: 'user',
            select: { username: 1 },
          },
        });

      if (!post) throw { name: 'NOT_FOUND' };

      post = post.toObject();
      post.id = post._id;
      post.user.id = post.user._id;

      post.likes = post.like_ids.map(like => ({
        id: like._id,
        user: {
          id: like.user._id,
          username: like.user.username,
        },
      }));

      post.comments = post.comment_ids.map(comment => ({
        id: comment._id,
        comment: comment.comment,
        user: {
          id: comment.user._id,
          username: comment.user.username,
        },
      }));

      delete post._id;
      delete post.user._id;
      delete post.like_ids;
      delete post.comment_ids;

      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  }

  static async editPostById(req, res, next) {
    try {
      const post = await Post.findOne({ _id: req.params.id });

      if (!post) throw { name: 'NOT_FOUND' };

      post.caption = req.body.caption;
      post.tags = req.body.tags;
      post.updated_at = Date.now();
      await post.save();

      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  }

  static async deletePost(req, res, next) {
    try {
      const { id } = req.params;
      const post = await Post.findOne({ _id: id });

      if (!post) throw { name: 'NOT_FOUND' };

      await Post.deleteOne({ _id: id });
      await Like.deleteMany({ PostId: { $eq: post._id } });
      await Comment.deleteMany({ PostId: { $eq: post._id } });

      res.status(200).json({
        message: 'post has been deleted successfully',
      });
    } catch (err) {
      next(err);
    }
  }

  static async getImageLables(req, res, next) {
    try {
      const lables = [];

      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const imageLables = await getLables(file);
        lables.push(imageLables);
        cleanTempFile(file);
      }

      res.json(lables);
    } catch (err) {
      next(err);
    }
  }
}

async function getLables(file) {
  const [result] = await client.labelDetection(
    path.join(__dirname, `../uploads/${file.filename}`)
  );
  const labels = result.labelAnnotations;

  return labels.map(v => ({
    name: v.description,
    score: v.score,
  }));
}

async function uploadFile(postId, file, index) {
  const options = {
    destination: `${
      process.env.NODE_ENV
    }/posts/${postId}/img-${index}${path.extname(file.filename)}`,
    validation: 'crc32c',
    resumable: true,
    public: true,
  };

  return new Promise((resolve, reject) => {
    bucket.upload(
      path.join(__dirname, `../uploads/${file.filename}`),
      options,
      (err, file) => {
        if (err) return reject(err);

        file.makePublic(err => {
          if (err) reject(err);
          else resolve(file.publicUrl());
        });
      }
    );
  });
}

function cleanTempFile(file) {
  return new Promise((resolve, reject) => {
    fs.unlink(path.join(__dirname, `../uploads/${file.filename}`), err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

module.exports = Controller;
