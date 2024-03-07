const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const {
    likePost,
    unlikePost,
    getLikesForPost
} = require("../controllers/LikeController");

// Like a post
router.post('/posts/:postId/like', auth, likePost);

// Unlike a post
router.delete('/posts/:postId/unlike', auth, unlikePost);

// Get all likes for a specific post
router.get('/posts/:postId/likes', auth, getLikesForPost);

module.exports = router;
