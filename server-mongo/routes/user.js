const router = require('express').Router();
const Controller = require('../controllers/user');



router.get('/', Controller.listUsers)           // done, but cant hide pw
router.get('/:id', Controller.findUserById)     // done with error handler
router.delete('/:id', Controller.deleteUser)    // done with error handler



module.exports = router