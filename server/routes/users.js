const router = require('express').Router();
const Controller = require('../controllers/user');

router.get('/', Controller.listUsers);
router.get('/:id', Controller.findUserById);

module.exports = router;
