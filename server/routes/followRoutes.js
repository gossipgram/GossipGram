const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const {
    followUser,
    unfollowUser,
    getFollowersForUser,
    getFollowingForUser
} = require("../controllers/FollowerController");

// Follow a user
router.post('/follow/:userId', auth, followUser);

// Unfollow a user
router.delete('/unfollow/:userId', auth, unfollowUser);

// Get all followers for a specific user
router.get('/followers/:userId', auth, getFollowersForUser);

// Get all users a specific user is following
router.get('/following/:userId', auth, getFollowingForUser);

module.exports = router;
