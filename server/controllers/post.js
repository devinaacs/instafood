const fs = require('fs');
const path = require('path');
const Post = require('../models/Post');
const PostTag = require('../models/PostTag');
const Like = require('../models/Like');
const Comment = require('../models/Comment');
const bucket = require('../helpers/fstorage').getBucket();

class Controller {
  static async createPost(req, res, next) {
    try {
      const { place_id, caption, tags } = req.body;

      let post = await Post.create({
        user_id: req.currentUser._id,
        place_id: place_id,
        caption: caption,
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

      let seedPostTags = [];

      tags.forEach(e => {
        seedPostTags.push({
          PostId: post._id,
          tag: e,
        });
      });

      await PostTag.insertMany(seedPostTags);

      post = post.toObject();
      post.id = post._id;
      delete post._id;
      delete post.__v;

      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  }

  static async listPosts(req, res, next) {
    try {
      let posts = await Post.find({}, { __v: 0 });

      posts = posts.map(v => {
        v = v.toObject();
        v.id = v._id;
        delete v._id;

        return v;
      });

      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  }

  static async findPostById(req, res, next) {
    try {
      const { id } = req.params;

      const post = await Post.findOne({ _id: id });

      if (!post) throw { name: 'NOT_FOUND' };

      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  }

  static async editPostById(req, res, next) {
    try {
      const { id } = req.params;
      const { caption, tags } = req.body;

      const post = await Post.findOne({ _id: id });

      if (!post) throw { name: 'NOT_FOUND' };

      post.caption = caption;

      let seedPostTags = [];
      await tags.forEach(e => {
        seedPostTags.push({
          PostId: post._id,
          tag: e,
        });
      });

      await PostTag.deleteMany({ PostId: { $gte: post._id } });

      await PostTag.insertMany(seedPostTags);

      post.updatedAt = Date.now();

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
      await PostTag.deleteMany({ PostId: { $gte: post._id } });
      await Like.deleteMany({ PostId: { $gte: post._id } });
      await Comment.deleteMany({ PostId: { $gte: post._id } });
      res.status(200).json({
        message: 'Post has been deleted successfully.',
      });
    } catch (err) {
      next(err);
    }
  }
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
