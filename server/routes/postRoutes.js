const express = require("express");
const router = express.Router();

const {
  createPost,
  getPostById,
  getAllPosts,
  updatePostById,
  deletePostById,
} = require("../controllers/PostController");
const { auth } = require("../middlewares/auth");

// create post
router.post("/posts", auth, createPost);

// get post by user id
router.get("/posts/:postId", auth, getPostById);

// get all post for user
router.get("/posts", auth, getAllPosts);

// update post
router.put("/posts/:postId", auth, updatePostById);

// delete post
router.delete("/posts/:postId", auth, deletePostById);

module.exports = router;
