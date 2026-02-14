const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getReferrals } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');


router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
// GET /api/v1/users/me/referrals
router.get('/me/referrals', protect, getReferrals);

module.exports = router;
