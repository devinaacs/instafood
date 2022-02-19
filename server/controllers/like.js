const Like = require('../models/Like');
const Post = require('../models/Post');

class Controller {
  static async createLike(req, res, next) {
    try {
      const { PostId } = req.body;

      // create Like
      const like = new Like({
        UserId: req.currentUser._id,
        PostId: PostId,
      });
      await like.save();

      // update to Post
      const post = await Post.findOne({ _id: PostId });
      post.like_ids.push(like.id)
      await post.save();


      res.status(201).json(like);
    } catch (err) {
      next(err);
    }
  }

  static async listLikes(req, res, next) {
    try {
      const likes = await Like.find().populate('PostId');

      res.status(200).json(likes);
    } catch (err) {
      next(err);
    }
  }

  static async findLikeByPostId(req, res, next) {
    try {
      const { postId } = req.params;

      const likes = await Like.find({ PostId: postId });

      if (!likes) throw { name: 'NOT_FOUND' };

      res.status(200).json(likes);
    } catch (err) {
      next(err);
    }
  }

  static async deleteLike(req, res, next) {
    try {
      const { id } = req.params;
      const like = await Like.findOne({ _id: id });

      if (!like) throw { name: 'NOT_FOUND' };

      await Like.deleteOne({ _id: id });

      res.status(200).json({
        message: 'Unliked this post.',
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
