import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";

const BASE_URL = "http://localhost:4000/api/v1/";

export const sendRequest = async (followingId, token) => {
  const toastId = toast.loading("Loading...");
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
    console.log("FOLLOW_REQUEST_USER_API API RESPONSE............", response);

    result = response.data;
  } catch (error) {
    console.log("FOLLOW_REQUEST_USER_API API ERROR............", error);
    result = error.response.data;
  }
  toast.dismiss(toastId);
  return result;
};

export const acceptRequest = async (requestId , token) => {
    const toastId = toast.loading("Loading...");
    let result= null;
    try{
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
    console.log("REQUEST_ACCEPT_API API RESPONSE............", response);
    } catch (error) {
    console.log("REQUEST_ACCEPT_API API ERROR............", error);
    result = error.response.data;
  }
  toast.dismiss(toastId);
  return result;
};

export const rejectRequest = async (requestId , token) => {
    const toastId = toast.loading("Loading...");
    let result= null;
    try{
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
    console.log("REQUEST_REJECT_API API RESPONSE............", response);
    } catch (error) {
    console.log("REQUEST_REJECT_API API ERROR............", error);
    result = error.response.data;
  }
  toast.dismiss(toastId);
  return result;
};