import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { followUser, unfollowUser } from "../../services/operations/friendAPI";
import { getAllUserData } from "../../services/operations/profileAPI";

const FollowerModal = ({
  followerDetails,
  followers,
  changeIsFollowerModalOpen,
}) => {
  const token = localStorage.getItem("token").split('"')[1];

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal-overlay")) {
        changeIsFollowerModalOpen();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [changeIsFollowerModalOpen]);
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
      // setFetchDataTrigger();
    }
  }, [token]);

  const userId = userData?.userDetails?._id;
  const allUserFollowing =
    userData?.userDetails?.following?.map((user) => user.following._id) || [];

  const followButtonHanler = async (isFollowing, clickedUserId) => {
    try {
      if (isFollowing) {
        await unfollowUser(clickedUserId, token);
      } else {
        await followUser(clickedUserId, token);
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
            <p className="text-2xl font-semibold text-richblack-5">Follower</p>
            <button
              onClick={changeIsFollowerModalOpen}
              className="cursor-pointer rounded-full text-white p-2 text-xl"
            >
              <RxCross2 />
            </button>
          </div>
          {followers.map((follower, index) => {
            const isFollowing = allUserFollowing.includes(
              follower?.follower?._id
            );
            const isCurrentUser = follower?.follower?._id === userId;
            console.log("isFollower", isFollowing);
            console.log("isCurrentUser", userId, follower?.follower?._id);
            console.log("isCurrentUser", isCurrentUser);
            console.log("followers_______________", followers);

            return (
              <div
                key={index}
                className="flex items-center border-b w-full p-2 border-yellow-500 justify-between"
              >
                <div className="flex items-center">
                  <img
                    src={follower.follower.image}
                    alt={follower.follower.username}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-richblack-5 text-lg">
                      {follower.follower.username}
                    </span>
                    <p className="text-richblack-100 text-sm">
                      {follower.follower.firstName} {follower.follower.lastName}
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
                      followButtonHanler(isFollowing, follower.follower._id)
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

export default FollowerModal;
