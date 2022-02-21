const router = require('express').Router();
const Controller = require('../controllers/tag');

router.get('/', Controller.listTags);
router.get('/:id', Controller.findTagById);

module.exports = router;
