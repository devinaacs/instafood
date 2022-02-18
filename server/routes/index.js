const router = require('express').Router();
const Controller = require('../controllers/user');
const auth = require('../middlewares/authentication');

router.use('/places', require('./places'));
router.post('/login', Controller.login);
router.post('/register', Controller.register);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));

router.use(auth);

router.use('/likes', require('./like'));
router.use('/comments', require('./comment'));

module.exports = router;
