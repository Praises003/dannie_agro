const express = require('express');
const router = express.Router();
const { protect,  } = require('../middlewares/authMiddleware');
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);

router.post('/', protect,  productController.createProduct);
router.put('/:id', protect,  productController.updateProduct);
router.delete('/:id', protect,  productController.deleteProduct);

module.exports = router;