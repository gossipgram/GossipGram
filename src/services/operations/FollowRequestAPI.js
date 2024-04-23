import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { followRequestEndpoints } from "../apis";

const {
    GET_ALL_REQUEST_BY_ID_API ,
    CANCEL_FOLLOW_REQUEST_API
} = followRequestEndpoints;

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
    result = response.data
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
    result = response.data
    } catch (error) {
    console.log("REQUEST_REJECT_API API ERROR............", error);
    result = error.response.data;
  }
  toast.dismiss(toastId);
  return result;
};

export const getAllRequestById = async (token) => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_REQUEST_BY_ID_API, null, {
      Authorization: `Bearer ${token}`,
    });
    // if (!response?.data?.success) {
    //   throw new Error("Could Not GET all data for user");
    // }
    result = response?.data;
    console.log("GET_ALL_USER_DATA_API_RESPONSE ", result);
  } catch (error) {
    console.log("GET_ALL_USER_DATA_API API ERROR............", error);
  }
  return result;
};


export const cancelFollowRequest = async (data , token) => {
    const toastId = toast.loading("Loading...");
    let result= null;
    try{
    const response = await apiConnector(
      "DELETE",
      CANCEL_FOLLOW_REQUEST_API,
      {
        data,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("CANCEL_FOLLOW_REQUEST_API API RESPONSE............", response);
    result = response.data
    } catch (error) {
    console.log("CANCEL_FOLLOW_REQUEST_API API ERROR............", error);
    result = error.response.data;
  }
  toast.dismiss(toastId);
  return result;
};

