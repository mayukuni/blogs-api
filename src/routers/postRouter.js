const { Router } = require('express');
const postController = require('../controllers/postController');

const router = Router();

router.get('/', postController.getAll);
router.get('/:id', postController.getById);

module.exports = router;