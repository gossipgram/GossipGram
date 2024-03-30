const express = require("express")
const router = express.Router()

const {
  updateProfile,
  deleteAccount,
  getAllUserData,
  updateDisplayPicture,
  addRecentSearch,
  removeRecentSearch
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

// add to recentSearches array
router.post('/addsearches', auth , addRecentSearch)

//remove from recentSearches
router.delete('/removesearches', auth , removeRecentSearch)

module.exports = router;
