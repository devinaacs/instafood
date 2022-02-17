const router = require('express').Router();
const Controller = require('../controllers/like');

router.post('/', Controller.createLike)                  // done
router.get('/', Controller.listLikes)
router.get('/:postId', Controller.findLikeByPostId)      // done
router.delete('/:id', Controller.deleteLike)             // done



module.exports = router