const Comment = require('../models/Comment');
const Post = require('../models/Post');

class Controller {
  static async createComment(req, res, next) {
    try {
      const { post_id, comment } = req.body;

      const newcomment = new Comment({
        UserId: req.currentUser._id,
        post_id: post_id,
        comment: comment,
      });
      await newcomment.save();

      // update to Post
      const post = await Post.findOne({ _id: post_id });
      post.comment_ids.push(newcomment._id);
      await post.save();

      res.status(201).json(newcomment);
    } catch (err) {
      next(err);
    }
  }

  static async listComments(req, res, next) {
    try {
      const comments = await Comment.find();

      res.status(200).json(comments);
    } catch (err) {
      next(err);
    }
  }

  static async findCommentByPostId(req, res, next) {
    try {
      const { postId } = req.params;

      const comment = await Comment.find({ post_id: postId });

      if (comment.length === 0) throw { name: 'NOT_FOUND' };

      res.status(200).json(comment);
    } catch (err) {
      next(err);
    }
  }

  static async deleteComment(req, res, next) {
    try {
      const { id } = req.params;
      const comment = await Comment.findOne({ _id: id });

      if (!comment) throw { name: 'NOT_FOUND' };

      await Comment.deleteOne({ _id: id });

      res.status(200).json({
        message: 'Comment has been deleted successfully.',
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
