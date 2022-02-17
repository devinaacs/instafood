const Post = require('../models/Post');
const PostTag = require('../models/PostTag');
const Like = require('../models/Like');
const Comment = require('../models/Comment')


class Controller {
    static async createPost(req, res, next) {
        try {
            const { PlaceId, caption, tags } = req.body
            // console.log({ PlaceId, caption, tags })

            const post = new Post({
                'UserId': req.currentUser._id,
                'PlaceId': PlaceId,
                'caption': caption,
            })
            await post.save();

            let seedPostTags = [];

            await tags.forEach(e => {
                seedPostTags.push({
                    'PostId': post._id,
                    'tag': e,
                });
            });
            console.log(seedPostTags)

            await PostTag.insertMany(seedPostTags)
            res.status(201).json(post)
        } catch (err) {
            next(err)
        }
    }

    static async listPosts(req, res, next) {
        try {
            const posts = await Post.find()

            res.status(200).json(posts)
        } catch (err) {
            next(err)
        }
    }

    static async findPostById(req, res, next) {
        try {
            const { id } = req.params

            const post = await Post.findOne({ _id: id })

            if (!post) throw { name: "NOT_FOUND" }

            res.status(200).json(post)
        } catch (err) {
            next(err)
        }
    }

    static async editPostById(req, res, next) {
        try {
            const { id } = req.params
            const { caption, tags } = req.body

            const post = await Post.findOne({ '_id': id })

            if (!post) throw { name: "NOT_FOUND" }

            post.caption = caption

            let seedPostTags = [];
            await tags.forEach(e => {
                seedPostTags.push({
                    'PostId': post._id,
                    'tag': e,
                });
            });

            await PostTag.deleteMany({ 'PostId': { $gte: post._id } })

            await PostTag.insertMany(seedPostTags)

            post.updatedAt = Date.now()


            await post.save()
            res.status(200).json(post)
        } catch (err) {
            next(err)
        }
    }

    static async deletePost(req, res, next) {
        try {
            const { id } = req.params
            const post = await Post.findOne({ _id: id })

            if (!post) throw { name: "NOT_FOUND" }

            await Post.deleteOne({ _id: id })
            await PostTag.deleteMany({ 'PostId': { $gte: post._id } })
            await Like.deleteMany({ 'PostId': { $gte: post._id } })
            await Comment.deleteMany({ 'PostId': { $gte: post._id } })
            res.status(200).json({
                message: `Post has been deleted successfully.`
            })
        } catch (err) {
            next(err)
        }
    }


}

module.exports = Controller