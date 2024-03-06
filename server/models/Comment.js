const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        // Text of the comment
        text: {
            type: String,
            required: true,
        },
        
        // User who posted this comment
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        // Post on which the comment was made
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
