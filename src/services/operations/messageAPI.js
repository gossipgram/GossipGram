import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { messageEndpoints } from "../apis";

const { SEND_MESSAGE_API, ALL_MESSAGES_API } = messageEndpoints;

export const sendMessage = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      SEND_MESSAGE_API,
      {
        data,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("SEND_MESSAGE_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
  } catch (error) {
    console.log("SEND_MESSAGE_API API ERROR............", error);
    result = error.response.data;
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  //   dispatch(setLoading(false));
  return result;
};

export const allMessage = async (chatId, token) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      ALL_MESSAGES_API,
      {
        chatId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("GET_ALL_MESSAGES API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
  } catch (error) {
    console.log("ALL_MESSAGES_API API ERROR............", error);
    result = error.response.data;
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  //   dispatch(setLoading(false));
  return result;
};
