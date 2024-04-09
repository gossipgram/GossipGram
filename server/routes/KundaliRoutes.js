const express = require("express");
const router = express.Router();

const {
    updateKundaliById,
    getKundaliById,
    getAllKundalis
} = require("../controllers/KundaliController");

const { auth } = require("../middlewares/auth");

// Update Profile Route
router.put("/update-kundali", auth, updateKundaliById);

// Get All User Kundali Route
router.get("/get-all-kundali", auth, getAllKundalis);

// Get All User Data Route by id
router.get("/:kundaliId", auth, getKundaliById);


module.exports = router;
