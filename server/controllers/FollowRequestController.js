const FollowRequest = require("../models/FollowRequest");
const Follower = require("../models/Follower");
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

    const followingId = request.following;
    const followerId = request.follower;

    const existingFollower = await Follower.findOne({
      following: followingId,
      follower: followerId,
    });

    if (existingFollower) {
      return res.status(400).json({
        success: false,
        message: "You are already following this user",
      });
    }

    const newFollower = new Follower({
      following: followingId,
      follower: followerId,
    });

    const savedFollower = await newFollower.save();

    // Update the user with the new follower ID in followers array
    await User.findByIdAndUpdate(followingId, {
      $push: { followers: savedFollower._id },
    });

    // Update the follower with the new following ID in following array
    await User.findByIdAndUpdate(followerId, {
      $push: { following: savedFollower._id },
    });

    // Delete the follow request from the database
    await FollowRequest.findByIdAndDelete(requestId);

    return res.status(200).json({
      success: true,
      message: "Follow request accepted successfully",
      request,
      follower: savedFollower,
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

    // Delete the follow request from the database
    await FollowRequest.findByIdAndDelete(requestId);

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

exports.getAllPendingRequestById = async (req, res) => {
  try {
    const userId = req.user.id;

    const pendingRequests = await FollowRequest.find({
      following: userId,
      status: "pending",
    }).populate({
      path: "follower",
      select: "username image _id firstName lastName",
    });

    return res.status(200).json({
      success: true,
      message: "All pending requests fetched successfully",
      requests: pendingRequests,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.cancelRequest = async (req, res) => {
  try {
    console.log("req",req)
    const { followerId, followingId } = req.body.data;
    console.log("followerId",followerId)
    console.log("followingId",followingId)

    const request = await FollowRequest.findOne({
      follower: followerId,
      following: followingId,
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Follow request not found",
      });
    }

    await FollowRequest.findByIdAndDelete(request._id);

    return res.status(200).json({
      success: true,
      message: "Follow request canceled successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.findRequestId = async (req, res) => {
  try {
    const { followerId, followingId } = req.query;
    console.log("followerId", followerId);
    console.log("followingId", followingId);

    const request = await FollowRequest.findOne({
      follower: followerId,
      following: followingId,
    });

    if (!request) {
      return res.status(200).json({
        success: false,
        message: "Follow request not found",
      });
    }

    return res.status(200).json({
      success: true,
      requestDetails: request,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
