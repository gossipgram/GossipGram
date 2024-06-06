const BASE_URL = "http://localhost:4000/api/v1/";

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "auth/sendotp",
  SIGNUP_API: BASE_URL + "auth/signup",
  LOGIN_API: BASE_URL + "auth/login",
  RESETPASSTOKEN_API: BASE_URL + "auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "auth/reset-password",
  GET_ALL_USERS_API: BASE_URL + "auth/users",
};

// MEDIA ENDPOINTS
export const mediaEndpoints = {
  CREATE_POST_API: BASE_URL + "media/posts", //post
  GET_POST_BY_ID_API: BASE_URL + "media/posts/:postId", //get
  GET_ALL_POSTS_API: BASE_URL + "media/posts", //get
  UPDATE_POST_BY_ID_API: BASE_URL + "media/posts/:postId", //put
  DELETE_POST_BY_ID_API: BASE_URL + "media/posts/:postId", //delete
};

// CHAT ENDPOINTS
export const chatEndpoints = {
  ACCESS_CHAT_API: BASE_URL + "chat/", //post
  FETCH_CHATS_API: BASE_URL + "chat/", //get
  CREATE_GROUP_CHAT_API: BASE_URL + "chat/group", //post
  RENAME_GROUP_API: BASE_URL + "chat/rename", //put
  REMOVE_FROM_GROUP_API: BASE_URL + "chat/groupremove", //put
  ADD_TO_GROUP_API: BASE_URL + "chat/groupadd", //put
  UPDATE_GROUP_DP_API: BASE_URL + "chat/groupimage" ,  //put
};

// MESSAGES ENDPOINTS
// export const messageEndpoints = {
//   SEND_MESSAGE_API: BASE_URL + "message/:chatId", //get
//   ALL_MESSAGES_API: BASE_URL + "message/", //post
// };

//MESSAGES ENDPOINTS
export const directMessageEndpoints = {
  SEND_DIRECT_MESSAGE_API: BASE_URL + "message/", //post
  GET_ALL_DIRECT_MESSAGE_API: BASE_URL + "message/:chatId", //get
};

// LIKES ENDPOINTS
// export const likesEndpoints = {
//   LIKE_POST_API: BASE_URL + "likes/posts/:postId/like", //post
//   UNLIKE_POST_API: BASE_URL + "likes/posts/:postId/unlike", //delete
// GET_LIKES_FOR_POST_API: BASE_URL + "likes/posts/:postId/likes", //get
// };

// COMMENTS ENDPOINTS
// export const commentsEndpoints = {
//   CREATE_COMMENT_API: BASE_URL + "comments/posts/:postId/comments", //post
//   GET_COMMENT_BY_ID_API: BASE_URL + "comments/comments/:commentId", //get
//   GET_ALL_COMMENTS_FOR_POST_API: BASE_URL + "comments/posts/:postId/comments", //get
//   UPDATE_COMMENT_BY_ID_API: BASE_URL + "comments/comments/:commentId", //put
//   DELETE_COMMENT_BY_ID_API: BASE_URL + "comments/comments/:commentId", //delete
// };

// FRIENDS ENDPOINTS
export const friendsEndpoints = {
  FOLLOW_USER_API: BASE_URL + "friends/follow/:userId", //post
  UNFOLLOW_USER_API: BASE_URL + "friends/unfollow/:userId", //delete
  GET_FOLLOWERS_FOR_USER_API: BASE_URL + "friends/followers/:userId", //get
  GET_FOLLOWING_FOR_USER_API: BASE_URL + "friends/following/:userId", //get
};

export const followRequestEndpoints = {
  GET_ALL_REQUEST_BY_ID_API: BASE_URL + "follow-request/follow/getAllRequestById" ,    //get
  CANCEL_FOLLOW_REQUEST_API: BASE_URL + "follow-request/follow/cancelrequest"  ,        //delete
  GET_REQUEST_BY_IDS_API: BASE_URL + "follow-request/follow/getrequest"          //get
}


// PROFILE ENDPOINTS
export const profileEndpoints = {
  UPDATE_PROFILE_API: BASE_URL + "profile/update-profile", //put
  DELETE_ACCOUNT_API: BASE_URL + "profile/delete-account", //delete
  GET_ALL_USER_DATA_API: BASE_URL + "profile/get-all-user-data", //get
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "profile/update-display-picture", //post
  GET_ALL_USER_DATA_BY_ID_API: BASE_URL + "profile/user/:userId", //get
  CHANGE_PASSWORD_API: BASE_URL + "auth/changepassword", //put,
  TOGGLE_PRIVATE_API: BASE_URL + "profile/togglePrivate"
};

// recentSearch ENDPOINTS
export const recentSearchEndpoints = {
  ADD_RECENT_SEARCHES_API: BASE_URL + "recents/addsearches", //post
  REMOVE_RECENT_SEARCHES_API: BASE_URL + "recents/removesearches", //delete
};

export const kundaliEndpoints = {
  UPDATE_KUNDALI_BY_ID_API: BASE_URL + "kundali/update-kundali",
  GET_ALL_KUNDALI_API: BASE_URL + "kundali/get-all-kudali",
  GET_KUNDALI_BY_ID_API: BASE_URL + "kundali/:kundaliId",
};

export const hashtagPostEndpoints = {
  GET_POSTS_BY_HASHTAG_API: BASE_URL + "hashtag-post/:hashtag", //declared insdie media api
  ADD_POST_TO_HASHTAG_API: BASE_URL + "hashtag-post/add-hashtag-post",
  REMOVE_POST_FROM_HASHTAG_API: BASE_URL + "hashtag-post/remove-hashtag-post",
};
