import { apiConnector } from "../apiConnector";

const BASE_URL = "http://localhost:4000/api/v1/";

export const sendRequest = async (followingId, token) => {
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      BASE_URL + `follow-request/follow/${followingId}`,
      {
        followingId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    result = response.data;
  } catch (error) {
    console.log("FOLLOW_REQUEST_USER_API API ERROR............", error);
    result = error.response.data;
  }
  return result;
};

export const acceptRequest = async (requestId, token) => {
  let result = null;
  try {
    const response = await apiConnector(
      "PUT",
      BASE_URL + `follow-request/follow/${requestId}/accept`,
      {
        requestId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.log("REQUEST_ACCEPT_API API ERROR............", error);
    result = error.response.data;
  }
  return result;
};

export const rejectRequest = async (requestId, token) => {
  let result = null;
  try {
    const response = await apiConnector(
      "PUT",
      BASE_URL + `follow-request/follow/${requestId}/reject`,
      {
        requestId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.log("REQUEST_REJECT_API API ERROR............", error);
    result = error.response.data;
  }
  return result;
};
