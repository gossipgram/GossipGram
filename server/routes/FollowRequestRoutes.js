const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const {
    sendFollowRequest,
    acceptFollowRequest,
    rejectFollowRequest,
} = require("../controllers/FollowRequestController");

// Route to send a follow request
router.post('/follow/:followingId', auth, sendFollowRequest);

// Route to accept a follow request
router.put('/follow/:requestId/accept', auth, acceptFollowRequest);

// Route to reject a follow request
router.put('/follow/:requestId/reject', auth, rejectFollowRequest);

module.exports = router;