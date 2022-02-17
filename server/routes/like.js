const router = require('express').Router();
const Controller = require('../controllers/like');

router.post('/', Controller.createLike);
router.get('/', Controller.listLikes);
router.get('/:postId', Controller.findLikeByPostId);
router.delete('/:id', Controller.deleteLike);

module.exports = router;
