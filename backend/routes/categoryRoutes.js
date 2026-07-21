const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { createCategoryRules, idParamRules } = require('../middleware/validation');

router.get('/', categoryController.getCategories);
router.get('/:id', idParamRules, categoryController.getCategoryById);

router.post('/', protect, authorize('admin'), createCategoryRules, categoryController.createCategory);
router.put('/:id', protect, authorize('admin'), idParamRules, categoryController.updateCategory);
router.delete('/:id', protect, authorize('admin'), idParamRules, categoryController.deleteCategory);

module.exports = router;
