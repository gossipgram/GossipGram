// Import the required modules
const express = require("express");
const router = express.Router()

const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
  updateGroupImage,
  addUserAsAdmin
} = require("../controllers/ConversationController")

const {protect} = require("../middlewares/auth");

router.post("/" , protect , accessChat)
router.get("/" , protect , fetchChats)
router.post("/group" , protect , createGroupChat)
router.put("/rename" , protect , renameGroup)
router.put("/groupremove" , protect , removeFromGroup)
router.put("/groupadd" , protect , addToGroup)
router.post("/groupimage" , protect , updateGroupImage)
router.post("/makeadmin", protect , addUserAsAdmin)

// Export the router for use in the main application
module.exports = router;