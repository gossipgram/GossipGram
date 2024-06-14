import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postType: "image",
  image: null,
  titleText: "",
  captionText: "",
  searchQuery: "",
  selectedUser: [],
  allUsers: [],
  notImage: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostType(state, action) {
      state.postType = action.payload;
    },
    setImage(state, action) {
      state.image = action.payload;
    },
    setTitleText(state, action) {
      state.titleText = action.payload;
    },
    setCaptionText(state, action) {
      state.captionText = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSelectedUser(state, action) {
      state.selectedUser = action.payload;
    },
    setAllUsers(state, action) {
      state.allUsers = action.payload;
    },
    setNotImage(state, action) {
      state.notImage = action.payload;
    },
  },
});

export const {
  setPostType,
  setImage,
  setTitleText,
  setCaptionText,
  setSearchQuery,
  setSelectedUser,
  setAllUsers,
  setNotImage,
} = postSlice.actions;

export default postSlice.reducer;
