const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const {
    sendFollowRequest,
    acceptFollowRequest,
    rejectFollowRequest,
    getAllPendingRequestById,
    cancelRequest
} = require("../controllers/FollowRequestController");

// Route to send a follow request
router.post('/follow/:followingId', auth, sendFollowRequest);

// Route to accept a follow request
router.put('/follow/:requestId/accept', auth, acceptFollowRequest);

// Route to reject a follow request
router.put('/follow/:requestId/reject', auth, rejectFollowRequest);

// Route for get all request for single user
router.get('/follow/getAllRequestById', auth, getAllPendingRequestById);

// route for cancel the request 
router.delete('/follow/cancelrequest', auth, cancelRequest);

module.exports = router;