const HashtagPosts = require("../models/HashtagPosts");
const Posts = require("../models/Post");
const { findByIdAndUpdate } = require("../models/Profile");

exports.addPostToHashtag = async (req, res) => {
  try {
    const hashtag = req.body.data;
    const postId = req.body.data;

    // Validation
    if (!hashtagName || !postId) {
      return res.status(400).json({
        success: false,
        message: "Hashtag and postId are required",
      });
    }
    const checkHashtag = await HashtagPosts.find(
      ({ hashtagName }) => hashtagName === hashtag
    );
    if (checkHashtag) {
      if (checkHashtag.posts.include(postId)) {
        return res.status(200).json({
          success: true,
          message: "Post already present in hashtag ",
        });
      } else {
        await HashtagPosts.findByIdAndUpdate(checkHashtag._id, {
          $push: { posts: postId },
          numberOfPost: checkHashtag.numberOfPost + 1,
        });
      }
    } else {
      const newHashtagPost = new HashtagPosts({
        hashtagName: hashtag,
        numberOfPost: 1,
      });
      await HashtagPosts.findByIdAndUpdate(newHashtagPost._id, {
        $push: { posts: postId },
      });
      return res.status(200).json({
        success: true,
        message: "Post added in hashtag ",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in addPostToHashtag controller ",
    });
  }
};
