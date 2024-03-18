const Like = require("../models/Like");
const Post = require("../models/Post");
const User = require("../models/User");

// Like a post
exports.likePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    const existingLike = await Like.findOne({ post: postId, user: userId });

    if (existingLike) {
      return res.status(400).json({
        success: false,
        message: "You have already liked this post",
      });
    }

    const newLike = new Like({
      user: userId,
      post: postId,
    });

    const savedLike = await newLike.save();

    // Update the post with the new like ID
    await Post.findByIdAndUpdate(postId, { $push: { likes: savedLike._id } });

    // Update the user with the new like ID
    await User.findByIdAndUpdate(userId, { $push: { likes: savedLike._id } });

    return res.status(201).json({
      success: true,
      message: "Post liked successfully",
      like: savedLike,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Unlike a post
exports.unlikePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    const deletedLike = await Like.findOneAndDelete({
      post: postId,
      user: userId,
    });

    if (!deletedLike) {
      return res.status(404).json({
        success: false,
        message: "Like not found",
      });
    }

    // Remove the like ID from the associated post
    await Post.findByIdAndUpdate(postId, { $pull: { likes: deletedLike._id } });

    // Remove the like ID from the associated user
    await User.findByIdAndUpdate(userId, { $pull: { likes: deletedLike._id } });

    return res.status(200).json({
      success: true,
      message: "Post unliked successfully",
      like: deletedLike,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Get all likes for a specific post
exports.getLikesForPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const likes = await Like.find({ post: postId });

    return res.status(200).json({
      success: true,
      message: "All likes for the post fetched successfully",
      likes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
