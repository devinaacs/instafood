const Comment = require('../models/Comment');
const Post = require('../models/Post');

class Controller {
  static async createComment(req, res, next) {
    const { post_id, comment } = req.body;

    const newcomment = new Comment({
      user: req.currentUser._id,
      post: post_id,
      comment: comment,
    });
    await newcomment.save();

    const post = await Post.findOne({ _id: post_id });
    post.comment_ids.push(newcomment._id);
    await post.save();

    res.status(201).json(newcomment);
  }

  static async listComments(req, res, next) {
    const comments = await Comment.find({}, { __v: 0, created_at: 0, updated_at: 0 });

    res.status(200).json(comments);
  }

  static async findCommentByPostId(req, res, next) {
    try {
      const { postId } = req.params;

      const comment = await Comment.find(
        { post: postId },
        { __v: 0, created_at: 0, updated_at: 0 });

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
