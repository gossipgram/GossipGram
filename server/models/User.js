// const mongoose = require("mongoose");

// const userModel = mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true,
//         },
//         email: {
//             type: String,
//             required: true,
//             unique: true,
//         },
//         password: {
//             type: String,
//             required: true,
//         },
//         isAdmin: {
//             type: Boolean,
//             required: true,
//             default: false,
//         },
//         dp: {
//             type: String,
//             required: true,
//             default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
//         },
//     },
//     {
//         timestamps: true
//     }
// );

// const User = mongoose.model("User", userModel);

// module.exports = User;



const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
        username:{
            type:String,
            required:true,
            trim:true,
        },
		// Define the email field with type String, required, and trimmed
		email: {
			type: String,
			required: true,
			trim: true,
		},

		// Define the password field with type String and required
		password: {
			type: String,
			required: true,
		},

		// confirmPassword: {
		// 	type: String,
		// 	required: true,             //solwe this issue later on 
		// },
        token: {
			type: String,
		},
        additionalDetails: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Profile",
		},
        image: {
			type: String,
			required: true,
		},
        // bio: {                        //already added to AdditionalDetails
		// 	type: String,        
		// 	required: true,
		// },

        // Relationship with Posts
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }],

        // Relationship with Comments
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }],

        // Relationship with Followers
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],

        // Relationship with Following
        following: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', userSchema);