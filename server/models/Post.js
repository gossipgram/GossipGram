const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      default: "",
    },

    // new feature
    hashtag: [
      {
        type: String,
        default: "",
      },
    ],
    // new feature tagges uder
    taggedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    mediaUrl: {
      type: String,
      default: "",
    },

    titleText: {
      type: String,
      default: "",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);

// const mongoose = require("mongoose");

// const postSchema = new mongoose.Schema(
//     {
//         // Caption for the post
//         caption: {
//             type: String,
//             required: true,
//         },

//         // Image or video URL for the post
//         mediaUrl: {
//             type: String,
//             required: true,
//         },

//         // User who posted this
//         user: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User',
//             required: true,
//         },

//         // Comments on this post
//         comments: [{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Comment',
//         }],

//         // Likes on this post
//         likes: [{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User',
//         }],

//     },
//     { timestamps: true }
// );

// module.exports = mongoose.model('Post', postSchema);
