const { Router } = require('express');
const userController = require('../controllers/userController');
const schema = require('../middlewares/schemas');

const router = Router();

router.post('/', schema, userController.create);
router.get('/', userController.getAll);
router.get('/:id', userController.getById);

module.exports = router;