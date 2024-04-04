const RecentSearch = require("../models/RecentSearch");
const User = require("../models/User");

// Controller to add userId to recentSearches array
exports.addRecentSearch = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(req.user.id);
    const isUserValid = await User.findById(req.body.userId);

    if (!isUserValid) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const newSearch = new RecentSearch({
      user: user,
      searchedUser: userId,
    });
    const savedSearch = await newSearch.save();

    // Update the user with the new search ID
    await User.findByIdAndUpdate(req.user.id, {
      $push: { recentSearches: savedSearch._id },
    });

    return res.status(200).json({
      success: true,
      message: "User added to recent searches",
      savedSearch,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Controller to remove userId from recentSearches array
exports.removeRecentSearch = async (req, res) => {
  try {
    const searchedUserId = req.body.searchedUserId;
    const userId = req.body.userId;
    const user = await User.findById(req.user.id);

    if (!searchedUserId) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const deletedSearch = await RecentSearch.findOneAndDelete({
      searchedUser: searchedUserId,
      user: userId,
    });

    if (!deletedSearch) {
      return res.status(404).json({
        success: false,
        message: "Seach not found",
      });
    }

    await User.findByIdAndUpdate(user, {
      $pull: { recentSearches: deletedSearch._id },
    });

    return res.status(200).json({
      success: true,
      message: "User removed from recent searches",
      deletedSearch,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
