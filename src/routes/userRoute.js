const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getReferrals, getReferralTree, getUsers, deleteUser } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');


router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
// GET /api/v1/users/me/referrals
router.get('/me/referrals', protect, getReferrals);
router.get('/me/referrals/tree', protect, getReferralTree);

// GET ALL USERS
router.get("/", getUsers);


// DELETE USER BY ID
router.delete("/:id", deleteUser);
module.exports = router;
