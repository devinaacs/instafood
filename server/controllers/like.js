const Like = require('../models/Like');
const Post = require('../models/Post');

class Controller {
  static async createLike(req, res, next) {
    const { post_id } = req.body;

    // create Like
    const like = new Like({
      user: req.currentUser._id,
      post: post_id,
    });
    await like.save();

    // update to Post
    const post = await Post.findOne({ _id: post_id });
    post.like_ids.push(like.id);
    await post.save();

    res.status(201).json(like);
  }

  static async listLikes(req, res, next) {
    const likes = await Like.find(
      {},
      { __v: 0, created_at: 0, updated_at: 0 }
    )
      .populate({
        path: 'user',
        select: { username: 1 },
      })
      .populate({
        path: 'post',
        select: { place_id: 1, caption: 1, images: 1, tags: 1 },
      });

    res.status(200).json(likes);
  }

  static async findLikeByPostId(req, res, next) {
    try {
      const { postId } = req.params;

      const likes = await Like.find(
        { post: postId },
        { __v: 0, created_at: 0, updated_at: 0 }
      )
        .populate({
          path: 'user',
          select: { username: 1 },
        })
        .populate({
          path: 'post',
          select: { place_id: 1, caption: 1, images: 1, tags: 1 },
        });

      if (likes.length === 0) throw { name: 'NOT_FOUND' };

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
