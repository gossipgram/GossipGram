import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";

const BASE_URL = "http://localhost:4000/api/v1/";

export const followUser = async (followingId, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    console.log("followingId", followingId);
    const response = await apiConnector(
      "POST",
      BASE_URL + `friends/follow/${followingId}`,
      {
        followingId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("FOLLOW_USER_API API RESPONSE............", response);

    // if (!response.data.success) {
    //   throw new Error(response.data.message);
    // }
    result = response.data;
  } catch (error) {
    console.log("FOLLOW_USER_API API ERROR............", error);
    result = error.response.data;
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  //   dispatch(setLoading(false));
  return result;
};

export const unfollowUser = async (followingId, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "DELETE",
      BASE_URL + `friends/unfollow/${followingId}`,
      {
        followingId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("UNFOLLOW_USER_API RESPONSE............", response);
    // if (!response?.data?.success) {
    //   throw new Error("Could Not UNFOLLOW USER");
    // }
    toast.success("UNFOLLOW USER");
    result = response?.data?.data;
  } catch (error) {
    console.log("UNFOLLOW USER API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const getFollowersForUser = async (userId, token) => {
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "GET",
      BASE_URL + `friends/followers/${userId}`,
      {
        userId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("GET_FOLLOWERS_FOR_USER_API RESPONSE............", response);
    // if (!response?.data?.success) {
    //   throw new Error("Could Not Fetch ALL FOLLOWERS");
    // }
    result = response?.data;
  } catch (error) {
    console.log("GET_FOLLOWERS_FOR_USER_API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const getFollowingForUser = async (userId, token) => {
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "GET",
      BASE_URL + `friends/following/${userId}`,
      {
        userId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("GET_FOLLOWING_FOR_USER_API RESPONSE............", response);
    // if (!response?.data?.success) {
    //   throw new Error("Could Not Fetch ALL FOLLOWING");
    // }
    result = response?.data;
  } catch (error) {
    console.log("GET_FOLLOWING_FOR_USER_API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
