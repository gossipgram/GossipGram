const Post = require("../models/Post");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { caption, textContent, hashtags } = req.body;
    let mediaUrl = null;
    if (!textContent) {
      mediaUrl = req.files.mediaUrl;
    }

    // Validation
    if (!(caption || mediaUrl || textContent) && !(mediaUrl || textContent)) {
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
      console.log(mediaUrlImage.secure_url);
    }

    const newPost = new Post({
      caption,
      mediaUrl: mediaUrlImage.secure_url || "",
      textContent: textContent || "",
      user: userId,
      hashtag: hashtags || [],
    });

    const savedPost = await newPost.save();

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
    // console.log("req.body",req.body)
    // const { currentPage } = req.query;

    const page = parseInt(req.query.currentPage) || 1;
    const limit = parseInt(req.query.limit) || 10;

    console.log("currentPage",page)


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





// exports.getAllPosts = async (req, res) => {
//   try {
//     const posts = await Post.find().populate("user", "-password").exec();

//     return res.status(200).json({
//       success: true,
//       message: "All posts fetched successfully",
//       posts,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       error: "Internal Server Error",
//     });
//   }
// };


exports.updatePostById = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { caption, mediaUrl, textContent } = req.body.data;

    const updatedFields = {};
    if (caption) updatedFields.caption = caption;
    if (mediaUrl) updatedFields.mediaUrl = mediaUrl;
    if (textContent) updatedFields.textContent = textContent;

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

exports.getAllPostsByHashtag = async (req, res) => {
  try {
    const { hashtag } = req.params;

    // Find all posts that contain the given hashtag
    const posts = await Post.find({ hashtag }).populate({
      path: 'user',
      select: 'username image _id',
    });

    return res.status(200).json({
      success: true,
      message: `Posts with hashtag '${hashtag}' retrieved successfully`,
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
