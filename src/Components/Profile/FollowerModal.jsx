import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { followUser, unfollowUser } from "../../services/operations/friendAPI";
import { getAllUserData } from "../../services/operations/profileAPI";
import { FollowRequestById, sendRequest } from "../../services/operations/FollowRequestAPI";

const FollowerModal = ({
  followerDetails,
  followers,
  changeIsFollowerModalOpen,
}) => {
  const token = localStorage.getItem("token").split('"')[1];

  const [userData, setUserData] = useState(null);
  const [requestedUser, setRequestedUser] = useState(false);
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
        // console.log("response",response)
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
  // console.log("userData",userData)
  const allUserFollowers =
    userData?.userDetails?.followers || [];

  console.log("allUserFollowers++++++++++++++",allUserFollowers)
  const followButtonHanler = async (isFollowing, clickedUserId) => {
    try {
      if (isFollowing) {
        await unfollowUser(clickedUserId, token);
      } else {
        await sendRequest(clickedUserId, token);
        setRequestedUser(true);
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
            const isFollowback = allUserFollowers.includes(
              follower?._id
            );

            // here i will use get all reqyest function and match userData id and id of all follower so that i can find is there requeat exist or not 
            const isCurrentUser = follower?.follower?._id === userId;
            // console.log("isFollower", isFollowing);
            console.log("isFollowback", isFollowback);
            // console.log("isCurrentUser", userId, follower?.follower?._id);
            // console.log("isCurrentUser", isCurrentUser);
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
                    className={`ml-4 bg-${
                      isFollowing ? "yellow-100 px-4" : "blue-100 px-6"
                    } text-richblack-900 rounded-xl font-medium py-[8px] mt-2 hover:bg-${
                      isFollowing ? "yellow" : "blue"
                    }-200`}
                    onClick={() =>
                      followButtonHanler(isFollowing, follower.follower._id)
                    }
                  >
                    {isFollowback && isFollowing ? "Following" : isFollowback ? "Follow back" : "Follow"}
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



// import React, { useEffect, useState } from "react";
// import { RxCross2 } from "react-icons/rx";
// import { followUser, unfollowUser } from "../../services/operations/friendAPI";
// import { getAllUserData } from "../../services/operations/profileAPI";
// import { FollowRequestById, sendRequest } from "../../services/operations/FollowRequestAPI";

// const FollowerModal = ({
//   followerDetails,
//   followers,
//   changeIsFollowerModalOpen,
// }) => {
//   const token = localStorage.getItem("token").split('"')[1];

//   const [userData, setUserData] = useState(null);
//   const [requestedUsers, setRequestedUsers] = useState({});

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (event.target.classList.contains("modal-overlay")) {
//         changeIsFollowerModalOpen();
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [changeIsFollowerModalOpen]);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await getAllUserData(token);
//         setUserData(response);
//       } catch (error) {
//         console.error("Error fetching user data:", error.message);
//       }
//     };

//     if (token) {
//       fetchUserData();
//     }
//   }, [token]);

//   useEffect(() => {
//     const fetchRequestDetails = async (followerId) => {
//       try {
//         const data = {
//           followerId: userData?.userDetails?._id,
//           followingId: followerId,
//         };
//         const response = await FollowRequestById(data, token);
//         return response;
//       } catch (error) {
//         console.error("Error in fetching followers of user:", error.message);
//         return null;
//       }
//     };

//     const requestsPromises = followers.map((follower) => fetchRequestDetails(follower._id));
//     Promise.all(requestsPromises)
//       .then((responses) => {
//         const requestedUsersData = {};
//         responses.forEach((response, index) => {
//           requestedUsersData[followers[index]._id] = response;
//         });
//         setRequestedUsers(requestedUsersData);
//       })
//       .catch((error) => {
//         console.error("Error fetching request details:", error.message);
//       });
//   }, [followers, token, userData?.userDetails?._id]);

//   const userId = userData?.userDetails?._id;
//   const allUserFollowing = userData?.userDetails?.following?.map((user) => user.following._id) || [];
//   const allUserFollowers = userData?.userDetails?.followers || [];

//   const followButtonHandler = async (isFollowing, clickedUserId) => {
//     try {
//       if (isFollowing) {
//         await unfollowUser(clickedUserId, token);
//       } else {
//         await sendRequest(clickedUserId, token);
//         setRequestedUsers({ ...requestedUsers, [clickedUserId]: true });
//       }
//     } catch (error) {
//       console.error("Error:", error.message);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm modal-overlay">
//       <div className="flex w-1/5 max-h-1/3 h-3/5 relative rounded-lg border border-richblack-400 bg-richblack-800 p-6">
//         <div className="flex flex-col mt-3 items-center w-full gap-3">
//           <div className="flex justify-between items-center w-full">
//             <p className="text-2xl font-semibold text-richblack-5">Follower</p>
//             <button
//               onClick={changeIsFollowerModalOpen}
//               className="cursor-pointer rounded-full text-white p-2 text-xl"
//             >
//               <RxCross2 />
//             </button>
//           </div>
//           {followers.map((follower, index) => {
//             const isFollowing = allUserFollowing.includes(follower._id);
//             const isFollowback = allUserFollowers.includes(follower._id);
//             const isCurrentUser = follower._id === userId;

//             return (
//               <div
//                 key={index}
//                 className="flex items-center border-b w-full p-2 border-yellow-500 justify-between"
//               >
//                 <div className="flex items-center">
//                   <img
//                     src={follower.image}
//                     alt={follower.username}
//                     className="w-10 h-10 rounded-full mr-4"
//                   />
//                   <div className="flex flex-col">
//                     <span className="font-semibold text-richblack-5 text-lg">
//                       {follower.username}
//                     </span>
//                     <p className="text-richblack-100 text-sm">
//                       {follower.firstName} {follower.lastName}
//                     </p>
//                   </div>
//                 </div>
//                 {!isCurrentUser && (
//                   <button
//                     className={`ml-4 bg-${isFollowing ? "yellow-100 px-4" : "blue-100 px-6"} text-richblack-900 rounded-xl font-medium py-[8px] mt-2 hover:bg-${isFollowing ? "yellow" : "blue"}-200`}
//                     onClick={() => followButtonHandler(isFollowing, follower._id)}
//                   >
//                     {requestedUsers[follower._id] === true && isFollowing ? "Following" : isFollowback ? "Follow back" : "Follow"}
//                   </button>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FollowerModal;
