const router = require('express').Router();

router.use('/posts', require('./posts'));
router.use('/places', require('./places'));

module.exports = router;
