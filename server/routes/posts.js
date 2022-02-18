const router = require('express').Router();
const Controller = require('../controllers/post');
const uploader = require('../middlewares/images-uploader');

router.post('/', uploader, Controller.createPost);
router.get('/', Controller.listPosts);
router.get('/:id', Controller.findPostById);
router.put('/:id', Controller.editPostById);
router.delete('/:id', Controller.deletePost);

module.exports = router;
