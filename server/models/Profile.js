const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
   
    gender: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    bio: {
        type: String,
        trim: true,
    },
    contactNumber: {
        type: Number,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

module.exports = mongoose.model("Profile", profileSchema);