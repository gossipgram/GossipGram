import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { friendsEndpoints } from "../apis";

const {
  FOLLOW_USER_API,
  UNFOLLOW_USER_API,
  GET_FOLLOWERS_FOR_USER_API,
  GET_FOLLOWING_FOR_USER_API,
} = friendsEndpoints;

export const followUser = async (followingId, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    console.log("followingId",followingId);
    const response = await apiConnector(
      "POST",
      FOLLOW_USER_API,
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
      UNFOLLOW_USER_API,
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
      GET_FOLLOWERS_FOR_USER_API,
      null,
      {
        userId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("GET_FOLLOWERS_FOR_USER_API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch ALL FOLLOWERS");
    }
    result = response?.data?.data;
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
      GET_FOLLOWING_FOR_USER_API,
      null,
      {
        userId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("GET_FOLLOWING_FOR_USER_API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch ALL FOLLOWING");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_FOLLOWING_FOR_USER_API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
