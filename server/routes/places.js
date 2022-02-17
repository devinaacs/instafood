const router = require('express').Router();
const controller = require('../controllers/place');

router.get('/', controller.searchPlaces);

module.exports = router;
