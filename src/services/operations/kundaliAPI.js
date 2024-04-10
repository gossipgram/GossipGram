import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { kundaliEndpoints, profileEndpoints } from "../apis";

const {
    UPDATE_KUNDALI_BY_ID_API ,
    GET_ALL_KUNDALI_API ,
    GET_KUNDALI_BY_ID_API
}= profileEndpoints;
const BASE_URL = "http://localhost:4000/api/v1/";

export const updatedKundali = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("PUT", UPDATE_KUNDALI_BY_ID_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error("Could Not Update Profile");
    }
    toast.success("UPDATE_KUNDALI_BY_ID_API Updated");
    result = response?.data?.data; 
  } catch (error) {
    console.log("UPDATE_KUNDALI_BY_ID_API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const getKundaliById = async (kundaliId, token) => {
  //check again
  let result = null;
  try {
    const response = await apiConnector(
      "GET",
      BASE_URL + `kundali/${kundaliId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error("Could Not GET kundali for user");
    }
    result = response?.data;
    console.log("GET_KUNDALI_BY_ID_API RESPONSE ", result);
  } catch (error) {
    console.log("GET_KUNDALI_BY_ID_API API ERROR............", error);
  }
  return result;
};

export const getAllUserData = async (token) => {
  //check again
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_KUNDALI_API, null, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error("Could Not GET_ALL_KUNDALI_API");
    }
    result = response?.data;
    console.log("GET_ALL_KUNDALI_API RESPONSE ", result);
  } catch (error) {
    console.log("GET_ALL_KUNDALI_API API ERROR............", error);
  }
  return result;
};