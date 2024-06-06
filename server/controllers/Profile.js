const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.updateProfile = async (req, res) => {
  try {
    //get data
    const { dateOfBirth = "", bio = "", contactNumber, gender } = req.body;
    //get UserId
    const id = req.user.id;
    //validation
    if (!contactNumber || !gender || !id) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //find Profile
    const userDetail = await User.findById(id);
    const profileId = userDetail.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    //Update Profile
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.bio = bio;
    profileDetails.gender = gender;
    profileDetails.contactNumber = contactNumber;
    await profileDetails.save();
    //return res
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profileDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//delete account
exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Delete Assosiated Profile with the User
    await Profile.findByIdAndDelete({ _id: user.additionalDetails });

    // Now Delete User
    await User.findByIdAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "User Cannot be deleted successfully" });
  }
};

//show user details
exports.getAllUserData = async (req, res) => {
  try {
    const id = req.user.id;

    // Validation and get user details
    const userDetails = await User.findById(id)
      .select("-password")
      .populate("additionalDetails")
      .populate({
        path: "posts",
        model: "Post",
      })
      .populate({
        path: "taggedPosts",
        model: "Post",
      })
      .populate({
        path: "recentSearches",
        populate: {
          path: "searchedUser",
          select: "username image firstName lastName _id",
        },
      })
      .populate({
        path: "following",
        populate: {
          path: "following",
          select: "username _id image",
        },
      })
      .exec();

    // Return response
    return res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAllUserDataById = async (req, res) => {
  try {
    const id = req.params.userId;

    // Validation and get user details
    const userDetails = await User.findById(id)
      .select("-password")
      .populate("additionalDetails")
      .populate({
        path: "posts",
        model: "Post",
      })
      .populate({
        path: "taggedPosts",
        model: "Post",
      })
      .populate({
        path: "recentSearches",
        populate: {
          path: "searchedUser",
          select: "username image firstName lastName _id",
        },
      })
      .exec();
    // Return response
    return res.status(200).json({
      success: true,
      message: "Selected user data fetched successfully",
      userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//update display picture
exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateIsPrivate = async (req , res) => {
  try{
    console.log(req.user)
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    user.isPrivate = !user.isPrivate;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'User privacy setting updated',
      isPrivate: user.isPrivate,
      user
    });
  }catch(error){
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}