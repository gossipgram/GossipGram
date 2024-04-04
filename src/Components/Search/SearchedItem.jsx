import React from "react";
import { RiCloseLine } from "react-icons/ri";

const SearchedItem = ({ matchingUsers, handleSearchItemClick }) => {
  const clickHandler = (user) => {
    const data = {
      firstName: user.firstName,
      image: user.image,
      lastName: user.lastName,
      username: user.username,
      _id: user._id,
    };
    handleSearchItemClick(user, data);
  };
  return (
    <div className="mt-1">
      {matchingUsers &&
        matchingUsers.map((user) => (
          <div
            key={user._id}
            className="flex flex-col p-5 border-b m-2 border-yellow-500 bg-richblack-700 hover:bg-richblue-300 cursor-pointer transition-all duration-200 relative"
            onClick={() => clickHandler(user)}
          >
            <div className="flex flex-row justify-between items-center">
              <div className="flex items-center">
                <img
                  src={user.image}
                  alt=""
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div className="flex flex-col">
                  <h3 className="font-semibold text-richblack-5 text-lg">
                    {user.username}
                  </h3>
                  <p className=" text-richblack-100 text-sm">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SearchedItem;
