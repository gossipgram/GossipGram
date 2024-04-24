import { apiConnector } from "../apiConnector";
import { mediaEndpoints } from "../apis";
import { hashtagPostEndpoints } from "../apis";

const {
  CREATE_POST_API,
  GET_POST_BY_ID_API,
  GET_ALL_POSTS_API,
  UPDATE_POST_BY_ID_API,
  DELETE_POST_BY_ID_API,
} = mediaEndpoints;

const {
  GET_POSTS_BY_HASHTAG_API,
  ADD_POST_TO_HASHTAG_API,
  REMOVE_POST_FROM_HASHTAG_API,
} = hashtagPostEndpoints;

const BASE_URL = "http://localhost:4000/api/v1/";

export const getPostById = async (token, postId) => {
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
  }
  return result;
};

// export const getAllPosts = async (token) => {
//   let result = [];
//   try {
//     const response = await apiConnector("GET", GET_ALL_POSTS_API, null, {
//       Authorization: `Bearer ${token}`,
//     });

//     console.log("GETT ALL POSTS API RESPONSE............", response);
//     if (!response?.data?.success) {
//       throw new Error("Could Not Fetch ALL POSTS");
//     }
//     result = response?.data;
//   } catch (error) {
//     console.log("GET ALL POSTS API ERROR............", error);
//   }
//   return result;
// };

export const getAllPosts = async (token, currentPage) => {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      `${GET_ALL_POSTS_API}?currentPage=${currentPage}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch ALL POSTS");
    }
    result = response?.data;
  } catch (error) {
    console.log("GET ALL POSTS API ERROR............", error);
  }
  return result;
};

export const createPost = async (data, token) => {
  let result = null;
  try {
    const response = await apiConnector("POST", CREATE_POST_API, data, {
      Authorization: `Bearer ${token}`,
    });

    // adding post to hashtag (another api call here for each hashtag used in the post)
    data.getAll("hashtags").map((hashtag) => {
      addPostToHashtag(hashtag, response?.data?.post?._id, token);
    });

    if (!response?.data?.success) {
      throw new Error("Could Not CREATE POST");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE POST API ERROR............", error);
  }
  return result;
};

export const updatePostById = async (post, data, token) => {
  let result = null;
  const postId = post?._id;
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
    let hashtags = data.caption.match(/#[^\s#]*/g);
    let deleteHashtag = post.hashtag.filter(
      (oldHashtag) => !hashtags.includes(oldHashtag)
    );
    // add and remove post in hastags
    hashtags.map((hashtag) => {
      addPostToHashtag(hashtag, postId, token);
    });
    deleteHashtag.map((hashtag) => {
      removePostFromHashtag(hashtag, postId, token);
    });

    if (!response?.data?.success) {
      throw new Error("Could Not Update POST");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE POST BY ID API ERROR............", error);
  }
  return result;
};

export const deletePostById = async (post, token) => {
  let result = null;
  const postId = post?._id;
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
    // remove post from hastags
    post.hashtag.map((hashtag) =>
      removePostFromHashtag(hashtag, postId, token)
    );

    if (!response?.data?.success) {
      throw new Error("Could Not Delete POST");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE POST BY ID API ERROR............", error);
  }
  return result;
};

export const getAllPostsByHashtag = async (hashtag, currentPage, token) => {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      BASE_URL + `hashtag-post/${hashtag}?currentPage=${currentPage}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error("Could Not Get posts");
    }

    result = response?.data?.hashtagPost;
    return result;
  } catch (error) {
    console.log("GET POST BY hashtag API ERROR............", error);
  }
};

export const addPostToHashtag = async (hashtag, postId, token) => {
  let result = [];
  let data = {};
  data.hashtag = hashtag;
  data.postId = postId;
  try {
    const response = await apiConnector("POST", ADD_POST_TO_HASHTAG_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error("Could Not Add Post To hashtag");
    }

    result = response?.data;
    return result;
  } catch (error) {
    console.log("ADD POST TO HASHTAG API ERROR............", error);
  }
};

export const removePostFromHashtag = async (hashtag, postId, token) => {
  let result = [];
  let data = { hashtag: hashtag, postId: postId };
  try {
    const response = await apiConnector(
      "DELETE",
      REMOVE_POST_FROM_HASHTAG_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error("Could Not Remove Post From hashtag");
    }

    result = response?.data;
    return result;
  } catch (error) {
    console.log("REMOVE POST FROM hashtag API ERROR............", error);
  }
};
