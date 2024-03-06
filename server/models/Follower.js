const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema(
    {
        // User who is following
        follower: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        // User being followed
        following: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model('Follower', followerSchema);
