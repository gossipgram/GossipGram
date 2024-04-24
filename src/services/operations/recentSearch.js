import { apiConnector } from "../apiConnector";
import { recentSearchEndpoints } from "../apis";

const { ADD_RECENT_SEARCHES_API, REMOVE_RECENT_SEARCHES_API } =
  recentSearchEndpoints;

export const addSearches = async (userId, token) => {
  let result = [];
  try {
    const response = await apiConnector(
      "POST",
      ADD_RECENT_SEARCHES_API,
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
    console.log("ADD_RECENT_SEARCHES_API API ERROR............", error);
    result = error.response.data;
  }
  return result;
};

export const removeSearches = async (searchedUserId, userId, token) => {
  let result = [];
  console.log(searchedUserId);
  console.log("uerid", userId);
  try {
    const response = await apiConnector(
      "DELETE",
      REMOVE_RECENT_SEARCHES_API,
      {
        searchedUserId,
        userId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    // if (!response?.data?.success) {
    //   throw new Error("Could Not Delete ACCOUNT");
    // }
    result = response?.data.deletedSearch;
  } catch (error) {
    console.log("REMOVE_RECENT_SEARCHES_API ERROR............", error);
  }
  return result;
};
