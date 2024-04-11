import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { followUser, unfollowUser } from "../../services/operations/friendAPI";
import { getAllUserData } from "../../services/operations/profileAPI";

const FollowingModal = ({
  followerDetails,
  following,
  changeIsFollowingModalOpen,
}) => {
  const token = localStorage.getItem("token").split('"')[1];

  const [userData, setUserData] = useState(null);
  const [isfollow, setIsfollow] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal-overlay")) {
        changeIsFollowingModalOpen();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [changeIsFollowingModalOpen]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getAllUserData(token);
        setUserData(response);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token, isfollow]);

  const userId = userData?.userDetails?._id;
  const allUserFollowing =
    userData?.userDetails?.following?.map((user) => user.following._id) || [];

  const followButtonHandler = async (isFollowing, clickedUserId) => {
    try {
      if (isFollowing) {
        await unfollowUser(clickedUserId, token);
        setIsfollow(false);
      } else {
        await followUser(clickedUserId, token);
        setIsfollow(true);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm modal-overlay">
      <div className="flex w-1/5 max-h-1/3 h-3/5 relative rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        <div className="flex flex-col mt-3 items-center w-full gap-3">
          <div className="flex justify-between items-center w-full">
            <p className="text-2xl font-semibold text-richblack-5">Following</p>
            <button
              onClick={changeIsFollowingModalOpen}
              className="cursor-pointer rounded-full text-white p-2 text-xl"
            >
              <RxCross2 />
            </button>
          </div>
          {following.map((following, index) => {
            const isFollowing = allUserFollowing.includes(
              following.following._id
            );
            const isCurrentUser = following.following._id === userId;

            return (
              <div
                key={index}
                className="flex items-center border-b w-full p-2 border-yellow-500 justify-between"
              >
                <div className="flex items-center">
                  <img
                    src={following.following.image}
                    alt={following.following.username}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-richblack-5 text-lg">
                      {following.following.username}
                    </span>
                    <p className="text-richblack-100 text-sm">
                      {following.following.firstName}{" "}
                      {following.following.lastName}
                    </p>
                  </div>
                </div>
                {isCurrentUser ? (
                  ""
                ) : (
                  <button
                    className={`ml-10 bg-${
                      isFollowing ? "yellow-100 px-4" : "blue-100 px-6"
                    } text-richblack-900 rounded-xl font-medium py-[8px] mt-2 hover:bg-${
                      isFollowing ? "yellow" : "blue"
                    }-200`}
                    onClick={() =>
                      followButtonHandler(isFollowing, following.following._id)
                    }
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FollowingModal;
