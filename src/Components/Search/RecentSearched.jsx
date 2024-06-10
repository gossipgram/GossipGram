import React from "react";
import { RiCloseLine } from "react-icons/ri";

const RecentSearched = ({
  recentSearches,
  handleSearchItemClick,
  removeRecentSearch,
  isFollower,
  userData,
}) => {
  const handleRemoveRecentSearch = (userId) => {
    removeRecentSearch(userId);
  };

  return (
    <div className="mt-1 overflow-y-scroll z-1 scrolling">
      <h1 className="text-yellow-300 text-xl">Recent</h1>
      {userData &&
        userData.map((recentSearch) => (
          <div
            key={recentSearch._id}
            className="flex flex-row justify-between p-5 border-b m-2 border-yellow-500 bg-richblack-700 hover:bg-richblue-300 cursor-pointer transition-all duration-200 "
          >
            <div className="flex flex-row justify-between w-full items-center">
              <div
                className="flex items-center w-11/12"
                onClick={() => handleSearchItemClick(recentSearch)}
              >
                <img
                  src={recentSearch.image}
                  alt=""
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div className="flex flex-col">
                  <h3 className="font-semibold text-richblack-5 text-lg">
                    {recentSearch.username}
                  </h3>
                  <p className="text-richblack-100 text-sm">
                    {recentSearch.firstName} {recentSearch.lastName}
                  </p>
                </div>
              </div>
            </div>
            <button
              className="text-white cursor-pointer w-1/12"
              onClick={() => removeRecentSearch(recentSearch._id)}
            >
              <RiCloseLine />
            </button>
          </div>
        ))}
    </div>
  );
};

export default RecentSearched;
