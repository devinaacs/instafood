const router = require('express').Router();
const controller = require('../controllers/place');

router.get('/photo', controller.getPhoto);
router.get('/:id', controller.getPlaceDetail);
router.get('/', controller.searchPlaces);

module.exports = router;
