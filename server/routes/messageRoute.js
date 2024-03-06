// Import the required modules
const express = require("express");
const router = express.Router()

const {
    allMessages,
    sendMessage,
} = require("../controllers/MessageController");

const {protect} = require("../middlewares/auth");

router.get("/:chatId" , protect , allMessages);
router.post("/" , protect , sendMessage);

// Export the router for use in the main application
module.exports = router