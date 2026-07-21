const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { createProductRules, updateProductRules, productFilterRules, idParamRules } = require('../middleware/validation');

router.get('/', productFilterRules, productController.getProducts);
router.get('/all', protect, authorize('admin'), productFilterRules, productController.getAllProducts);
router.get('/:id', idParamRules, productController.getProductById);

router.post('/', protect, authorize('admin'), createProductRules, productController.createProduct);
router.put('/:id', protect, authorize('admin'), idParamRules, updateProductRules, productController.updateProduct);
router.delete('/:id', protect, authorize('admin'), idParamRules, productController.deleteProduct);

module.exports = router;
