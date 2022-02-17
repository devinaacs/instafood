const router = require('express').Router();
const Controller = require('../controllers/comment');

router.post('/', Controller.createComment)          // done
router.get('/', Controller.listComments)
router.get('/:postId', Controller.findCommentById)      // done
router.delete('/:id', Controller.deleteComment)     // done



module.exports = router