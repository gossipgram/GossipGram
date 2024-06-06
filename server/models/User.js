const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    // Define the email field with type String, required, and trimmed
    email: {
      type: String,
      required: true,
      trim: true,
    },

    // Define the password field with type String and required
    password: {
      type: String,
      required: true,
    },

    //solwe this issue later on confirm password

    token: {
      type: String,
    },
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Profile",
    },

    kundali: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Kundali",
    },

    image: {
      type: String,
      required: true,
    },

    // isGroupPrivate: {
    //   type: Boolean ,
    //   required:true
    // } ,

    recentSearches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RecentSearch",
      },
    ],

    // Relationship with Posts
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

    taggedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

    // Relationship with Comments
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],

    // Relationship with Followers
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Follower",
      },
    ],

    // Relationship with Following
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Follower",
      },
    ],

    isPrivate: { 
      type: Boolean, 
      default: false 
    },
    // likes: [{
    // 	type: mongoose.Schema.Types.ObjectId,
    // 	ref: "likes"
    // }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
