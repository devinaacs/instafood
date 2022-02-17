const router = require('express').Router();
const Controller = require('../controllers/user');

router.get('/', Controller.listUsers);
router.get('/:id', Controller.findUserById);
router.delete('/:id', Controller.deleteUser);

module.exports = router;
