import { apiConnector } from "../apiConnector";
// import { likesEndpoints } from "../apis";

// const { LIKE_POST_API, UNLIKE_POST_API } = likesEndpoints;

const BASE_URL = "http://localhost:4000/api/v1/";

export const likePost = async (postId, token) => {
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      BASE_URL + `likes/posts/${postId}/like`,
      {
        postId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
  } catch (error) {
    console.log("LIKE_POST_API API ERROR............", error);
    result = error.response.data;
  }
  //   dispatch(setLoading(false));
  return result;
};

export const unlikePost = async (postId, token) => {
  let result = null;
  try {
    const response = await apiConnector(
      "DELETE",
      BASE_URL + `likes/posts/${postId}/unlike`,
      {
        postId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
  } catch (error) {
    console.log("UNLIKE_POST_API API ERROR............", error);
    result = error.response.data;
  }
  //   dispatch(setLoading(false));
  return result;
};

export const getLikesForPost = async (postId, token) => {
  //check again

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

    result = response?.data;
  } catch (error) {
    console.log("GET_LIKES_FOR_POST API ERROR............", error);
  }
  return result;
};
