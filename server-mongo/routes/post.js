const router = require('express').Router();
const Controller = require('../controllers/post');

router.post('/', Controller.createPost)         // done, but no validation
router.get('/', Controller.listPosts)           // done
router.get('/:id', Controller.findPostById)     // done
router.put('/:id', Controller.editPostById)     // done
router.delete('/:id', Controller.deletePost)    // done



module.exports = router