const router = require('express').Router();
const controller = require('../controllers/trending');

router.get('/posts', controller.getPosts);
router.get('/places', controller.getPlaces);
router.get('/tags', controller.getTags);

module.exports = router;
