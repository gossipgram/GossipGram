const Post = require("../models/Post");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// Create a new post
exports.createPost = async (req, res) => {
  try {
    let { caption } = req.body;
    const mediaUrl = req.files.mediaUrl;
    const userId = req.user.id;
    console.log(userId, mediaUrl, caption);

    // Validation
    if (!caption || !mediaUrl || !userId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const mediaUrlImage = await uploadImageToCloudinary(
      mediaUrl,
      process.env.FOLDER_NAME
    );
    console.log(mediaUrlImage);

    const newPost = new Post({
      caption,
      mediaUrl: mediaUrlImage.secure_url,
      user: userId,
    });

    const savedPost = await newPost.save();

    // Update the user's posts array
    await User.findByIdAndUpdate(userId, { $push: { posts: savedPost._id } });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: savedPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Get post details by ID
exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post details fetched successfully",
      post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Get a list of all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "-password").exec();

    return res.status(200).json({
      success: true,
      message: "All posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Update post details by ID
exports.updatePostById = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { caption, mediaUrl } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { caption, mediaUrl },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Delete post by ID
exports.deletePostById = async (req, res) => {
  try {
    const postId = req.params.postId;

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      post: deletedPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
