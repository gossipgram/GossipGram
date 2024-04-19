const HashtagPosts = require("../models/HashtagPosts");

exports.getAllPostsByHashtag = async (req, res) => {
  try {
    const { hashtag } = req.params;
    const page = parseInt(req.query.currentPage) || 1;
    const limit = parseInt(req.query.limit) || 30;

    const count = await HashtagPosts.countDocuments();
    const totalPages = Math.ceil(count / limit);
    const skip = (page - 1) * limit;
    // Find all posts that contain the given hashtag
    const hashtagPost = await HashtagPosts.find({ hashtagName: `#${hashtag}` })
      .populate({
        path: "posts",
        model: "Post",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    return res.status(200).json({
      success: true,
      message: `Posts with hashtag '${hashtag}' retrieved successfully`,
      hashtagPost: hashtagPost[0],
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

exports.addPostToHashtag = async (req, res) => {
  try {
    const { hashtag } = req.body;
    const { postId } = req.body;

    // Validation
    if (!hashtag || !postId) {
      return res.status(400).json({
        success: false,
        message: "Hashtag and postId are required",
      });
    }
    const checkHashtag = await HashtagPosts.find({ hashtagName: hashtag });
    // console.log("checkHashtag", checkHashtag[0].posts.include(postId));
    if (checkHashtag.length !== 0) {
      if (checkHashtag[0]?.posts.includes(postId)) {
        return res.status(200).json({
          success: true,
          message: "Post already present in hashtag ",
        });
      } else {
        await HashtagPosts.findByIdAndUpdate(checkHashtag[0]?._id, {
          $push: { posts: postId },
          numberOfPost: checkHashtag[0].numberOfPost + 1,
        });
      }
    } else {
      const newHashtagPost = new HashtagPosts({
        hashtagName: hashtag,
        numberOfPost: 1,
      });
      const savedHashtag = await newHashtagPost.save();
      await HashtagPosts.findByIdAndUpdate(savedHashtag._id, {
        $push: { posts: postId },
      });
      return res.status(200).json({
        success: true,
        message: "Post added in hashtag ",
        data: savedHashtag,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in addPostToHashtag controller ",
    });
  }
};

exports.removePostFromHashtag = async (req, res) => {
  try {
    const { hashtag } = req.body;
    const { postId } = req.body;

    // Validation
    if (!hashtag || !postId) {
      return res.status(400).json({
        success: false,
        message: "Hashtag and postId are required",
      });
    }
    const checkHashtag = await HashtagPosts.find({ hashtagName: hashtag });
    console.log(checkHashtag[0]);
    if (checkHashtag[0]) {
      if (!checkHashtag[0]?.posts.includes(postId)) {
        return res.status(200).json({
          success: true,
          message: "Post already deleted in hashtag ",
        });
      } else {
        await HashtagPosts.findByIdAndUpdate(checkHashtag[0]?._id, {
          $pull: { posts: postId },
          numberOfPost: checkHashtag[0]?.numberOfPost - 1,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Hashtag was not present",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in removePostFromtHashtag",
    });
  }
};
