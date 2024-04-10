const mongoose = require("mongoose");

const KundaliSchema = new mongoose.Schema({
   
    // token: {
    //   type: String,
    // },

    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Profile",
    },

    // motive: {
    //     type: String,
    //     require: true,                   // eg. travelling partner , gossip Partner , Study Partner
    //     trim: true,
    // },

    state: {
        type: String,
        // required: true,
        trim: true,
    },

    city: {
        type: String,
        // required: true,
        trim: true,
    },

    age: {
        type: Number,
        // required: true,
        min: 0
    },

    hobbies:[ {
        type: String,
        // required: true,
        trim: true,
    } ],

    languages:[ {
        type: String,
        trim: true,
        // required: true
    } ],

    religion: {
        type:String,
        // required: true
    },

    occupation: {
        type:String,
        // required: true
    },

    movies:[ {
        type: String,
        required: true,
        trim: true,
    } ],

    food:[ {
        type: String,
        required: true,
        trim: true,
    } ],

    songs:[ {
        type: String,
        required: true,
        trim: true,
    } ],


});

module.exports = mongoose.model("Kundali", KundaliSchema);