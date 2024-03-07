const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const {
    createComment,
    getCommentById,
    getAllCommentsForPost,
    updateCommentById,
    deleteCommentById
} = require("../controllers/CommentController");

// Create a new comment on a post
router.post('/posts/:postId/comments', auth, createComment);

// Get comment details by ID
router.get('/comments/:commentId', auth, getCommentById);

// Get all comments for a specific post
router.get('/posts/:postId/comments', auth, getAllCommentsForPost);

// Update comment details by ID
router.put('/comments/:commentId', auth, updateCommentById);

// Delete comment by ID
router.delete('/comments/:commentId', auth, deleteCommentById);

module.exports = router;
