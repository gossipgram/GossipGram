import { apiConnector } from "../apiConnector";
import { directMessageEndpoints } from "../apis";

const { SEND_DIRECT_MESSAGE_API, GET_ALL_DIRECT_MESSAGE_API } =
  directMessageEndpoints;

export const sendDirectMessage = async (data, token) => {
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

    // if (!response.data.success) {
    //   throw new Error(response.data.message);
    // }

    result = response.data;
  } catch (error) {
    console.log("SEND_MESSAGE_API API ERROR............", error);
    result = error.response.data;
  }
  return result;
};

export const getAllDirectMessage = async (chatId, token) => {
  let result = [];
  const BASE_URL = "http://localhost:4000/api/v1/";
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

    // if (!response.data.success) {
    //   throw new Error(response.data.message);
    // }

    result = response.data;
  } catch (error) {
    console.log("GET_ALL_DIRECT_MESSAGE_API API ERROR............", error);
    result = error.response.data;
  }
  //   dispatch(setLoading(false));
  return result;
};
