import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { mediaEndpoints } from "../apis";

const {
  CREATE_POST_API,
  GET_POST_BY_ID_API,
  GET_ALL_POSTS_API,
  UPDATE_POST_BY_ID_API,
  DELETE_POST_BY_ID_API,
} = mediaEndpoints;

const BASE_URL = "http://localhost:4000/api/v1/";

export const getPostById = async (token, postId) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "GET",
      GET_POST_BY_ID_API,
      {
        postId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("GET_POST_BY_ID_API API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_POST_BY_ID_API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const getAllPosts = async (token) => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_POSTS_API, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log("GETT ALL POSTS API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch ALL POSTS");
    }
    result = response?.data?.posts;
  } catch (error) {
    console.log("GET ALL POSTS API ERROR............", error);
  }
  return result;
};

export const createPost = async (data, token) => {
  let result = null;

  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_POST_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE POST API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not CREATE POST");
    }
    toast.success("POST CREATED");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE POST API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const updatePostById = async (postId, data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "PUT",
      BASE_URL + `media/posts/${postId}`,
      {
        data,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("UPDATE POST BY ID API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update POST");
    }
    toast.success("Post Updated");
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE POST BY ID API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deletePostById = async (postId, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "DELETE",
      BASE_URL + `media/posts/${postId}`,
      {
        postId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("DELETE POST BU ID API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete POST");
    }
    toast.success("POST Deleted");
    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE POST BY ID API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
