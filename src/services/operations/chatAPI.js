// yeh bnana hai
// user model me followers orr baaki array jo empty arhe h
import { apiConnector } from "../apiConnector";
import { chatEndpoints } from "../apis";

const {
  ACCESS_CHAT_API,
  FETCH_CHATS_API,
  CREATE_GROUP_CHAT_API,
  RENAME_GROUP_API,
  REMOVE_FROM_GROUP_API,
  ADD_TO_GROUP_API,
  UPDATE_GROUP_DP_API,
} = chatEndpoints;

export const accessChat = async (userId, token) => {
  let result = [];
  try {
    const response = await apiConnector(
      "POST",
      ACCESS_CHAT_API,
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
    console.log("ACCESS_CHAT_API API ERROR............", error);
    result = error.response.data;
  }
  //   dispatch(setLoading(false));
  return result;
};

export const fetchChats = async (token) => {
  let result = [];
  try {
    const response = await apiConnector("GET", FETCH_CHATS_API, null, {
      Authorization: `Bearer ${token}`,
    });

    // if (!response.data.success) {
    //   throw new Error(response.data.message);
    // }
    result = response;
  } catch (error) {
    console.log("FETCH_CHATS_API API ERROR............", error);
    result = error.response;
  }
  // dispatch(setLoading(false));
  return result;
};

export const createGroupChat = async (token, data) => {
  let result = [];
  try {
    const response = await apiConnector("POST", CREATE_GROUP_CHAT_API, data, {
      Authorization: `Bearer ${token}`,
    });

    // if (!response.data.success) {
    //   throw new Error(response.data.message);
    // }
    result = response.data;
  } catch (error) {
    console.log("CREATE_GROUP_CHAT_API API ERROR............", error);
    result = error.response.data;
  }
  //   dispatch(setLoading(false));
  return result;
};

export const renameGroup = async (data, token) => {
  let result = null;
  try {
    const response = await apiConnector("PUT", RENAME_GROUP_API, data, {
      Authorization: `Bearer ${token}`,
    });

    result = response?.data;
  } catch (error) {
    console.log("RENAME_GROUP_API API ERROR............", error);
  }
  return result;
};

export const removeFromGroup = async (data, token) => {
  let result = null;
  try {
    const response = await apiConnector("PUT", REMOVE_FROM_GROUP_API, data, {
      Authorization: `Bearer ${token}`,
    });
    // if (!response?.data?.success) {
    //   throw new Error("Could Not Remove");
    // }
    result = response?.data;
  } catch (error) {
    console.log("REMOVE_FROM_GROUP_API API ERROR............", error);
  }
  return result;
};

export const addToGroup = async (data, token) => {
  let result = null;
  try {
    const response = await apiConnector("PUT", ADD_TO_GROUP_API, data, {
      Authorization: `Bearer ${token}`,
    });
    // if (!response?.data?.success) {
    //   throw new Error("Could Not add to Group");
    // }
    result = response?.data;
  } catch (error) {
    console.log("ADD_TO_GROUP_API API ERROR............", error);
  }
  return result;
};

export const updateGroupDp = async (token, formData) => {
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      UPDATE_GROUP_DP_API,
      formData,

      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );

    result = response?.data;
  } catch (error) {
    console.log("UPDATE_GROUP_DP_API API ERROR............", error);
    result = error.response.data;
  }
  return result;
};
