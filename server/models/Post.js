const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        // Caption for the post
        caption: {
            type: String,
            required: true,
        },
        
        // Image or video URL for the post
        mediaUrl: {
            type: String,
            required: true,
        },
        
        // User who posted this
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        // Comments on this post
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }],

        // Likes on this post
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],

    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
