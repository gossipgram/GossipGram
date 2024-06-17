import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import userProfileReducer from "../slices/userProfileSlice";
import postReducer from "../slices/postSlice";
import profileSlice from "../slices/profileSlice";
import partnerSlice from "../slices/partnerSlice";
// import cartSlice from "../slices/cartSlice";
// import courseReducer from "../slices/courseSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  userProfile: userProfileReducer,
  post: postReducer,
  profile: profileSlice,
  partner: partnerSlice,
});

export default rootReducer;
