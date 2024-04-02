const mongoose = require("mongoose");

const recentSearchSchema = new mongoose.Schema(
  {
    // User who is searching
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // user who is searched
    searchedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RecentSearch", recentSearchSchema);
