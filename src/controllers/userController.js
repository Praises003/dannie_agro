const userService = require('../services/userService');

const getProfile = async (req, res) => {
  try {
    const user = await userService.getProfile(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const updatedUser = await userService.updateProfile(req.user.id, req.body);
    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getReferrals = async (req, res) => {
  try {
    const referrals = await userService.getDirectReferrals(req.user.id);
    res.status(200).json(referrals);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getReferralTree = async (req, res) => {
  try {
    const tree = await userService.getReferralTree(req.user.id);
    res.status(200).json(tree);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};




// GET ALL USERS
const getUsers = async (req, res) => {
  try {

    const users = await userService.getAllUsers();

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};


// DELETE USER
const deleteUser = async (req, res) => {

  try {

    const result = await userService.deleteUser(req.params.id);

    res.status(200).json(result);

  } catch (error) {

    res.status(400).json({
      error: error.message
    });

  }
};



module.exports = { getProfile, updateProfile, getReferrals, getReferralTree, getUsers, deleteUser };