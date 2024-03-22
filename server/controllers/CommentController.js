const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

// Create a new comment on a post
exports.createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.postId;
    const userId = req.user.id;

    // Validation
    if (!text || !postId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Text and postId are required",
      });
    }

    const newComment = new Comment({
      text,
      user: userId,
      post: postId,
    });

    const savedComment = await newComment.save();

    // Update the post with the new comment ID
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: savedComment._id },
    });

    return res.status(201).json({
      success: true,
      message: "Comment created successfully",
      comment: savedComment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Get comment details by ID
exports.getCommentById = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const comment = await Comment.findById(commentId)
      .populate("user", "-password")
      .exec();

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Comment details fetched successfully",
      comment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Get all comments for a specific post
exports.getAllCommentsForPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ post: postId })
      .populate("user", "-password")
      .exec();

    return res.status(200).json({
      success: true,
      message: "All comments for the post fetched successfully",
      comments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Update comment details by ID
exports.updateCommentById = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { text } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { text },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment: updatedComment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Delete comment by ID
exports.deleteCommentById = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Remove the comment ID from the associated post
    await Post.findByIdAndUpdate(deletedComment.post, {
      $pull: { comments: deletedComment._id },
    });

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      comment: deletedComment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
