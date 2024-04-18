const express = require("express");
const router = express.Router();

const {
  getAllPostsByHashtag,
  addPostToHashtag,
  removePostFromHashtag,
} = require("../controllers/HashtagPostsController");

const { auth } = require("../middlewares/auth");
// get all by hashtag
router.get("/:hashtag", auth, getAllPostsByHashtag);
// add or create the hashtagPost
router.post("/add-hashtag-post", auth, addPostToHashtag);
// remove the post from hashtag
router.delete("/remove-hashtag-post", auth, removePostFromHashtag);
module.exports = router;
