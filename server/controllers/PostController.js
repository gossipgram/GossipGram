const Post = require("../models/Post");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { caption, titleText, hashtags, taggedUsers } = req.body;

    let mediaUrl = null;
    if (!titleText) {
      mediaUrl = req.files.mediaUrl;
    }

    // Validation
    if (!(caption || mediaUrl || titleText) && !(mediaUrl || titleText)) {
      return res.status(400).json({
        success: false,
        message:
          "At least one of caption, mediaUrl, or textContent is required",
      });
    }

    const userId = req.user.id;

    let mediaUrlImage = "";
    if (mediaUrl) {
      mediaUrlImage = await uploadImageToCloudinary(
        mediaUrl,
        process.env.FOLDER_NAME
      );
    }

    const newPost = new Post({
      caption,
      mediaUrl: mediaUrlImage.secure_url || "",
      titleText: titleText || "",
      user: userId,
    });

    const savedPost = await newPost.save();

    await User.findByIdAndUpdate(userId, { $push: { posts: savedPost._id } });

    const updateUserTagPost = async (taggedUser) => {
      await User.findByIdAndUpdate(taggedUser, {
        $push: { taggedPosts: savedPost._id },
      });
      await Post.findByIdAndUpdate(savedPost._id, {
        $push: { taggedUsers: taggedUser },
      });
    };

    const updateHashtags = async (hashtag) => {
      await Post.findByIdAndUpdate(savedPost._id, {
        $push: { hashtag: hashtag },
      });
    };

    if (hashtags) {
      hashtags.forEach((hashtag) => {
        updateHashtags(hashtag);
      });
    }

    if (taggedUsers) {
      taggedUsers.forEach((taggedUser) => {
        updateUserTagPost(taggedUser);
      });
    }

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
    // console.log("req.body",req.body)
    // const { currentPage } = req.query;

    const page = parseInt(req.query.currentPage) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const count = await Post.countDocuments();
    const totalPages = Math.ceil(count / limit);
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate("user", "-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.updatePostById = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { caption } = req.body.data;
    let hashtags = caption.match(/#[^\s#]*/g);
    const updatedFields = {};
    if (caption) updatedFields.caption = caption;
    if (hashtags) updatedFields.hashtag = hashtags;

    const updatedPost = await Post.findByIdAndUpdate(postId, updatedFields, {
      new: true,
    });

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

    const deletedPost = await Post?.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Remove post ID from user's posts array
    await User.findByIdAndUpdate(deletedPost?.user, {
      $pull: { posts: postId },
    });

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

// get posts by hashtags
