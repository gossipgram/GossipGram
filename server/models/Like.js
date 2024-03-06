const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
    {
        // User who liked
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        // Post that was liked
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model('Like', likeSchema);
