const express = require('express');
const router = express.Router();
const { protect,  } = require('../middlewares/authMiddleware');
const cartController = require('../controllers/cartController');

router.post('/add', protect, cartController.addToCart);
router.get('/', protect, cartController.getCart);
router.delete('/item/:id', protect, cartController.removeFromCart);

module.exports = router;