const mongoose = require("mongoose");

const HashtagPostsSchema = new mongoose.Schema(
  {
    hashtagName: {
      type: String,
      require: true,
    },

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    numberOfPost: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("hashtagpost", HashtagPostsSchema);
