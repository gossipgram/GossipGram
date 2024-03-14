import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { likesEndpoints } from "../apis";

const { LIKE_POST_API, UNLIKE_POST_API, GET_LIKES_FOR_POST_API } =
  likesEndpoints;

export const likePost = async (postId, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      LIKE_POST_API,
      {
        postId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("LIKE_POST_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
  } catch (error) {
    console.log("LIKE_POST_API API ERROR............", error);
    result = error.response.data;
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  //   dispatch(setLoading(false));
  return result;
};

export const unlikePost = async (postId, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "DELETE",
      UNLIKE_POST_API,
      {
        postId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("UNLIKE_POST_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
  } catch (error) {
    console.log("UNLIKE_POST_API API ERROR............", error);
    result = error.response.data;
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  //   dispatch(setLoading(false));
  return result;
};

export const getLikesForPost = async (postId, token) => {
  //check again
  const toastId = toast.loading("Loading...");
  console.log(token);
  const BASE_URL = "http://localhost:4000/api/v1/";
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      BASE_URL + `likes/posts/${postId}/likes`,
      {
        postId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("GET_LIKES_FOR_POST API RESPONSE............", response);
    toast.success("likes for a post successfull");
    result = response?.data;
  } catch (error) {
    console.log("GET_LIKES_FOR_POST API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
