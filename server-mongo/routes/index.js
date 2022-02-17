const router = require('express').Router();
const Controller = require('../controllers/user');
const authentication = require('../middlewares/authentication');

router.post('/login', Controller.login)             // done with error handler
router.post('/register', Controller.register)       // done with validation and error handler

router.use(authentication)


router.use('/', require('./post'))
router.use('/users', require('./user'))
// router.use('/tags', require('./tag'))
router.use('/likes', require('./like'))
router.use('/comments', require('./comment'))
// router.use('/postImages', require('/postImage'))
// router.use('/places', require('/place'))
// router.use('/placeImages', require('/placeImage'))





module.exports = router