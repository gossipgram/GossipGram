const FollowRequest = require("../models/FollowRequest");
const User = require("../models/User");

// Send follow request
exports.sendFollowRequest = async (req, res) => {
  try {
    const { followingId } = req.params;
    const followerId = req.user.id;

    // Check if the follow request already exists
    const existingRequest = await FollowRequest.findOne({
      following: followingId,
      follower: followerId,
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "Follow request already sent",
      });
    }

    const newRequest = new FollowRequest({
      following: followingId,
      follower: followerId,
    });

    const savedRequest = await newRequest.save();

    return res.status(201).json({
      success: true,
      message: "Follow request sent successfully",
      request: savedRequest,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Accept follow request
exports.acceptFollowRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId;

    const request = await FollowRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Follow request not found",
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Follow request is already accepted or rejected",
      });
    }

    // Update status to accepted
    request.status = "accepted";
    await request.save();

    // Update the user with the new follower ID in followers array
    await User.findByIdAndUpdate(request.following, {
      $push: { followers: request.follower },
    });

    // Update the follower with the new following ID in following array
    await User.findByIdAndUpdate(request.follower, {
      $push: { following: request.following },
    });

    return res.status(200).json({
      success: true,
      message: "Follow request accepted successfully",
      request,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Reject follow request
exports.rejectFollowRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId;

    const request = await FollowRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Follow request not found",
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Follow request is already accepted or rejected",
      });
    }

    // Update status to rejected
    request.status = "rejected";
    await request.save();

    return res.status(200).json({
      success: true,
      message: "Follow request rejected successfully",
      request,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
