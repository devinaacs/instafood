const router = require('express').Router();
const Controller = require('../controllers/tag');

router.post('/', Controller.createTag);
router.get('/', Controller.listTags);
router.get('/:id', Controller.findPostById);
router.delete('/:id', Controller.deletePost);

module.exports = router;
