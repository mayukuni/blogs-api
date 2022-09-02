const { Router } = require('express');
const categoriesController = require('../controllers/categoriesController');

const router = Router();

router.post('/', categoriesController.create);
router.get('/', categoriesController.getAll);

module.exports = router;