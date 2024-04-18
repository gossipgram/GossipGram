// yeh bnana hai
// user model me followers orr baaki array jo empty arhe h
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { chatEndpoints } from "../apis";

const {
  ACCESS_CHAT_API,
  FETCH_CHATS_API,
  CREATE_GROUP_CHAT_API,
  RENAME_GROUP_API,
  REMOVE_FROM_GROUP_API,
  ADD_TO_GROUP_API,
  UPDATE_GROUP_DP_API
} = chatEndpoints;

export const accessChat = async (userId, token) => {
  const toastId = toast.loading("Loading...");
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
    console.log("ACCESS_CHAT_API API RESPONSE............", response);

    // if (!response.data.success) {
    //   throw new Error(response.data.message);
    // }
    result = response.data;
  } catch (error) {
    console.log("ACCESS_CHAT_API API ERROR............", error);
    result = error.response.data;
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  //   dispatch(setLoading(false));
  return result;
};

export const fetchChats = async (token) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", FETCH_CHATS_API, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("FETCH_CHATS_API API RESPONSE............", response);

    // if (!response.data.success) {
    //   throw new Error(response.data.message);
    // }
    result = response;
  } catch (error) {
    console.log("FETCH_CHATS_API API ERROR............", error);
    result = error.response;
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  // dispatch(setLoading(false));
  return result;
};

export const createGroupChat = async (token , data) => {
  console.log("data",data)
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    console.log("inside the response function of API")
    const response = await apiConnector("POST", CREATE_GROUP_CHAT_API, data , {
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE_GROUP_CHAT_API API RESPONSE............", response);

    // if (!response.data.success) {
    //   throw new Error(response.data.message);
    // }
    result = response.data;
  } catch (error) {
    console.log("CREATE_GROUP_CHAT_API API ERROR............", error);
    result = error.response.data;
    
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  //   dispatch(setLoading(false));
  return result;
};

export const renameGroup = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("PUT", RENAME_GROUP_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("RENAME_GROUP_API API RESPONSE............", response);
    
    toast.success("Group name Updated");
    result = response?.data;
  } catch (error) {
    console.log("RENAME_GROUP_API API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const removeFromGroup = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("PUT", REMOVE_FROM_GROUP_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("REMOVE_FROM_GROUP_API API RESPONSE............", response);
    // if (!response?.data?.success) {
    //   throw new Error("Could Not Remove");
    // }
    toast.success("Removed from Group");
    result = response?.data;
  } catch (error) {
    console.log("REMOVE_FROM_GROUP_API API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const addToGroup = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("PUT", ADD_TO_GROUP_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("ADD_TO_GROUP_API API RESPONSE............", response);
    // if (!response?.data?.success) {
    //   throw new Error("Could Not add to Group");
    // }
    toast.success("Added to Group Successfully");
    result = response?.data;
  } catch (error) {
    console.log("ADD_TO_GROUP_API API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const updateGroupDp = async (token, formData) => {
  const toastId = toast.loading("Loading...");
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
    console.log("UPDATE_GROUP_DP_API RESPONSE............", response);

    // if (!response.data.success) {
    //   throw new Error(response.data.message);
    // }
    result = response.data;
  } catch (error) {
    console.log("UPDATE_GROUP_DP_API API ERROR............", error);
    result = error.response.data;
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  //   dispatch(setLoading(false));
  return result;
};