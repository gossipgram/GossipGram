const Follower = require("../models/Follower");
const User = require("../models/User");

// Follow a user
exports.followUser = async (req, res) => {
    try {
        const followingId = req.params.userId;
        const followerId = req.user.id;

        if(followingId === followerId) {
            return res.status(400).json({
                success: false,
                message: 'You cant follow youself',
            });
        }

        const existingFollower = await Follower.findOne({ following: followingId, follower: followerId });

        if (existingFollower) {
            return res.status(400).json({
                success: false,
                message: 'You are already following this user',
            });
        }

        const newFollower = new Follower({
            following: followingId,
            follower: followerId,
        });

        const savedFollower = await newFollower.save();

        // Update the user with the new follower ID in followers array
        await User.findByIdAndUpdate(followingId, { $push: { followers: savedFollower._id } });

        // Update the follower with the new following ID in following array
        await User.findByIdAndUpdate(followerId, { $push: { following: savedFollower._id } });

        return res.status(201).json({
            success: true,
            message: 'User followed successfully',
            follower: savedFollower,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
    try {
        const followingId = req.params.userId;
        const followerId = req.user.id;

        const deletedFollower = await Follower.findOneAndDelete({ following: followingId, follower: followerId });

        if (!deletedFollower) {
            return res.status(404).json({
                success: false,
                message: 'Follower not found',
            });
        }

        // Remove the follower ID from the associated user's followers array
        await User.findByIdAndUpdate(followingId, { $pull: { followers: deletedFollower._id } });

        // Remove the following ID from the associated user's following array
        await User.findByIdAndUpdate(followerId, { $pull: { following: deletedFollower._id } });

        return res.status(200).json({
            success: true,
            message: 'User unfollowed successfully',
            follower: deletedFollower,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};

// Get all followers for a specific user
exports.getFollowersForUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const followers = await Follower.find({ following: userId }).populate('follower','-password -email');

        return res.status(200).json({
            success: true,
            message: 'All followers for the user fetched successfully',
            followers,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};

// Get all users a specific user is following
exports.getFollowingForUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const following = await Follower.find({ follower: userId }).populate('following','-password -email');

        return res.status(200).json({
            success: true,
            message: 'All users following by the user fetched successfully',
            following,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};
