const Comment = require('../models/Comment');

class Controller {
  static async createComment(req, res, next) {
    try {
      const { PostId, comment } = req.body;
      // console.log({ PlaceId, caption, tags })

      const newcomment = new Comment({
        UserId: req.currentUser._id,
        PostId: PostId,
        comment: comment,
      });
      await newcomment.save();

      res.status(201).json(newcomment);
    } catch (err) {
      next(err);
    }
  }

  static async listComments(req, res, next) {
    try {
      console.log('masok');
      const comments = await Comment.find();

      res.status(200).json(comments);
    } catch (err) {
      next(err);
    }
  }

  static async findCommentById(req, res, next) {
    try {
      const { postId } = req.params;

      const comment = await Comment.find({ PostId: postId });

      if (!comment) throw { name: 'NOT_FOUND' };

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
