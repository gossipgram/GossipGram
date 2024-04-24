import { apiConnector } from "../apiConnector";
import { commentsEndpoints } from "../apis";

// const {
//   CREATE_COMMENT_API,
//   GET_COMMENT_BY_ID_API,
//   GET_ALL_COMMENTS_FOR_POST_API,
//   UPDATE_COMMENT_BY_ID_API,
//   DELETE_COMMENT_BY_ID_API,
// } = commentsEndpoints;

const BASE_URL = "http://localhost:4000/api/v1/";

export const createComment = async (text, postId, token) => {
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      BASE_URL + `comments/posts/${postId}/comments`,
      {
        text,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("CREATE_COMMENT_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
  } catch (error) {
    console.log("CREATE_COMMENT_API API ERROR............", error);
    result = error.response.data;
  }
  return result;
};

export const getCommentById = async (commentId, token) => {
  let result = null;
  try {
    const response = await apiConnector(
      "GET",
      BASE_URL + `comments/comments/${commentId}`,
      {
        commentId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("GET_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
  } catch (error) {
    console.log("GET_COMMENT_BY_ID_API API ERROR............", error);
    result = error.response.data;
  }
  //   dispatch(setLoading(false));
  return result;
};

export const getAllCommentsForPost = async (postId, token) => {
  //check again
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      BASE_URL + `comments/posts/${postId}/comments`,
      {
        postId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.success) {
      throw new Error("Could Not GET all comments for post");
    }
    result = response?.data;
  } catch (error) {
    console.log("GET_ALL_COMMENTS_FOR_POST API ERROR............", error);
  }
  return result;
};

export const updateCommentById = async (text, commentId, token) => {
  try {
    const response = await apiConnector(
      "PUT",
      BASE_URL + `comments/comments/${commentId}`,
      {
        text,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error("Could Not Update COMMENT");
    }
  } catch (error) {
    console.log("UPDATE COMMENT BY ID API ERROR............", error);
  }
};

export const deleteCommentById = async (commentId, token) => {
  try {
    const response = await apiConnector(
      "DELETE",
      BASE_URL + `comments/comments/${commentId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.log("DELETE COMMENT BY ID API ERROR............", error);
  }
};
