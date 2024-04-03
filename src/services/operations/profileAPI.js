import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis";

const {
  UPDATE_PROFILE_API,
  DELETE_ACCOUNT_API,
  GET_ALL_USER_DATA_API,
  UPDATE_DISPLAY_PICTURE_API,
  ADD_RECENT_SEARCHES_API,
  REMOVE_RECENT_SEARCHES_API,
} = profileEndpoints;

export const updatedProfile = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("PUT", UPDATE_PROFILE_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error("Could Not Update Profile");
    }
    toast.success("Profile Updated");
    result = response?.data?.data; //check after run
  } catch (error) {
    console.log("UPDATE_PROFILE_API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteAccount = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("DELETE", DELETE_ACCOUNT_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE_ACCOUNT_API API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete ACCOUNT");
    }
    toast.success("ACCOUNT Deleted");
    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE_ACCOUNT_API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const getAllUserData = async (token) => {
  //check again
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_USER_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error("Could Not GET all data for user");
    }
    result = response?.data;
  } catch (error) {
    console.log("GET_ALL_USER_DATA_API API ERROR............", error);
  }
  return result;
};

export const updateDp = async ( token , formData) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  console.log("after declaration")
  try {
    console.log("before function")
    const response = await apiConnector(
      "POST",
      UPDATE_DISPLAY_PICTURE_API,
        formData,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("before function")
    console.log("UPDATE_DISPLAY_PICTURE_API RESPONSE............", response);

    // if (!response.data.success) {
    //   throw new Error(response.data.message);
    // }
    result = response.data;
  } catch (error) {
    console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
    result = error.response.data;
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  //   dispatch(setLoading(false));
  return result;
};

export const addSearches = async (userId, token) => {
  let result = [];
  try {
    const response = await apiConnector(
      "POST",
      ADD_RECENT_SEARCHES_API,
      {
        userId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    // if (!response.data.success) {
    //   throw new Error(response.data.message);
    // }
    result = response.data;
  } catch (error) {
    console.log("ADD_RECENT_SEARCHES_API API ERROR............", error);
    result = error.response.data;
  }
  return result;
};

export const removeSearches = async (userId, token) => {
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "DELETE",
      REMOVE_RECENT_SEARCHES_API,
      {
        userId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    // if (!response?.data?.success) {
    //   throw new Error("Could Not Delete ACCOUNT");
    // }
    toast.success("Search Deleted");
    result = response?.data?.data;
  } catch (error) {
    console.log("REMOVE_RECENT_SEARCHES_API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
