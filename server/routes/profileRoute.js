const express = require("express")
const router = express.Router()

const {
  updateProfile,
  deleteAccount,
  getAllUserData,
  updateDisplayPicture,
} = require('../controllers/Profile');
const { auth } = require('../middlewares/auth');

// Update Profile Route
router.put('/update-profile', auth , updateProfile);

// Delete Account Route
router.delete('/delete-account', auth , deleteAccount);

// Get All User Data Route
router.get('/get-all-user-data', auth , getAllUserData);

// Update Display Picture Route
router.post('/update-display-picture', auth , updateDisplayPicture);

module.exports = router;
