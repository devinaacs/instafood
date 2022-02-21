const router = require('express').Router();
const Controller = require('../controllers/post');
const uploader = require('../middlewares/images-uploader');
const auth = require('../middlewares/authentication');

router.post('/', auth, uploader, Controller.createPost);
router.get('/', Controller.listPosts);
router.get('/:id', Controller.findPostById);
router.put('/:id', auth, Controller.editPostById);
router.delete('/:id', auth, Controller.deletePost);
router.post('/images-lables', auth, uploader, Controller.getImageLables);

module.exports = router;
