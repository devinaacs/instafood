const router = require('express').Router();
const Controller = require('../controllers/comment');

router.post('/', Controller.createComment);
router.get('/', Controller.listComments);
router.get('/:postId', Controller.findCommentByPostId);
router.delete('/:id', Controller.deleteComment);

module.exports = router;
