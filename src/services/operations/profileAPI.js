import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis";
import toast from "react-hot-toast";


const {
  UPDATE_PROFILE_API,
  DELETE_ACCOUNT_API,
  GET_ALL_USER_DATA_API,
  GET_ALL_USER_DATA_BY_ID_API,
  UPDATE_DISPLAY_PICTURE_API,
  CHANGE_PASSWORD_API,
  TOGGLE_PRIVATE_API,
} = profileEndpoints;
const BASE_URL = "http://localhost:4000/api/v1/";

export const updatedProfile = async (data, token) => {
  let result = null;
  try {
    const response = await apiConnector("PUT", UPDATE_PROFILE_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error("Could Not Update Profile");
    }
    result = response?.data?.data; //check after run
  } catch (error) {
    console.log("UPDATE_PROFILE_API ERROR............", error);
  }
  return result;
};

export const deleteAccount = async (data, token) => {
  let result = null;
  try {
    const response = await apiConnector("DELETE", DELETE_ACCOUNT_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error("Could Not Delete ACCOUNT");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE_ACCOUNT_API ERROR............", error);
  }
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

export const getAllUserDataById = async (userId, token) => {
  //check again
  let result = null;
  try {
    const response = await apiConnector(
      "GET",
      BASE_URL + `profile/user/${userId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error("Could Not GET all data for user");
    }
    result = response?.data;
    console.log("response............", response);
  } catch (error) {
    console.log("GET_ALL_USER_DATA_API API ERROR............", error);
  }
  return result;
};

export const updateDp = async (token, formData) => {
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      UPDATE_DISPLAY_PICTURE_API,
      formData,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );

    // if (!response.data.success) {
    //   throw new Error(response.data.message);
    // }
    result = response.data;
  } catch (error) {
    console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
    result = error.response.data;
  }
  //   dispatch(setLoading(false));
  return result;
};

export async function changePassword(token, formData) {
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error);
  }
}

export const togglePrivacy = async (token) => {
  let result = null;
  try {
    const response = await apiConnector("PUT", TOGGLE_PRIVATE_API, {} , {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error("Could Not toggle private");
    }
    result = response?.data; //check after run
    toast.success("privacy changed")
  } catch (error) {
    console.log("TOGGLE_PRIVATE_API ERROR............", error);
  }
  return result;
};