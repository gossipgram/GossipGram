import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { directMessageEndpoints } from "../apis";

const { SEND_DIRECT_MESSAGE_API, GET_ALL_DIRECT_MESSAGE_API } =
  directMessageEndpoints;

export const sendDirectMessage = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  const chatId = data?.chatId;
  const content = data?.content;
  try {
    const response = await apiConnector(
      "POST",
      SEND_DIRECT_MESSAGE_API,
      {
        chatId,
        content,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("SEND_MESSAGE_API API RESPONSE............", response);

    // if (!response.data.success) {
    //   throw new Error(response.data.message);
    // }

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

export const getAllDirectMessage = async (chatId, token) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  const BASE_URL = "https://gossipgram.onrender.com/api/v1/";
  try {
    const response = await apiConnector(
      "GET",
      BASE_URL + `message/${chatId}`,
      {
        chatId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log(
      "GET_ALL_DIRECT_MESSAGE_API API RESPONSE............",
      response
    );

    // if (!response.data.success) {
    //   throw new Error(response.data.message);
    // }

    result = response.data;
    console.log("result............................", result);
  } catch (error) {
    console.log("GET_ALL_DIRECT_MESSAGE_API API ERROR............", error);
    result = error.response.data;
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  //   dispatch(setLoading(false));
  return result;
};
