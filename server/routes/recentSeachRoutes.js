const express = require("express");
const router = express.Router();

const {
  addRecentSearch,
  removeRecentSearch,
} = require("../controllers/RecentSearch");
const { auth } = require("../middlewares/auth");

// add to recentSearches array
router.post("/addsearches", auth, addRecentSearch);

//remove from recentSearches
router.delete("/removesearches", auth, removeRecentSearch);

module.exports = router;
